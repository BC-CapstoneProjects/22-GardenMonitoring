import boto3
from botocore.exceptions import ClientError
import os, time, logging
from time import gmtime, strftime
from config.definitions import ROOT_DIR


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


session = boto3.Session(
    aws_access_key_id="",
    aws_secret_access_key="",
)

client = session.client('s3')
s3 = session.resource('s3')
gardens = {}
p = os.path.join(ROOT_DIR, 'images')
images = os.listdir(p)


def new_user_garden(user_client):
    os.system('cls')
    garden_created = False
    while not garden_created:
        garden_name = input("Please provide a unique Garden ID or type 'q' to quit: ")
        if garden_name == 'q':
            break;
        try:
            response = user_client.create_bucket(
                Bucket=garden_name,
                CreateBucketConfiguration={
                    'LocationConstraint': 'us-west-2',
                },
            )
        except user_client.exceptions.ClientError:
            print(bcolors.FAIL + "Invalid bucket name\n" + bcolors.ENDC)
            continue
        except user_client.exceptions.BucketAlreadyExists:
            print(bcolors.FAIL + "Garden name already exists\n" + bcolors.ENDC)
            continue
        except user_client.exceptions.BucketAlreadyOwnedByYou:
            client_response = input(
                bcolors.FAIL + "Garden already exists and is owned by you, would you like to use it?\n" + bcolors.ENDC)
            if client_response.lower() == 'y':
                for bucket in s3.buckets.all():
                    if garden_name == bucket.name:
                        gardens[garden_name] = "active"
                        garden_created = True
                        continue
            else:
                continue
        else:
            garden_created = True


def list_gardens(user_client):
    os.system('cls')
    for bucket in s3.buckets.all():
        # existing s3 buckets will default to a non-active status
        if bucket.name not in gardens:
            gardens[bucket.name] = "non-active"

    print("Enter the garden name to toggle between active and non-active status, or enter 'q' to go back.\n\n")
    print("Garden name, Status: \n")
    garden_number = 1
    for key, value in gardens.items():
        print('- %s, %s' % (key, value))
        garden_number += 1


def select_garden(user_client):
    invalid_response = False
    garden_selection = ""
    while 'q' not in garden_selection:
        os.system('cls')
        list_gardens(user_client)
        if invalid_response:
            print("\n\nGarden status was not updated")
            time.sleep(.5)
        garden_selection = input("\n>    ")
        if garden_selection in gardens and gardens[garden_selection] is "non-active":
            gardens[garden_selection] = "active"
            print(garden_selection, "was found and is", gardens[garden_selection])
            invalid_response = False
        elif garden_selection in gardens and gardens[garden_selection] is "active":
            gardens[garden_selection] = "non-active"
            print(garden_selection, "was found and is", gardens[garden_selection])
            invalid_response = False
        else:
            invalid_response = True
            continue


def menu():
    print(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
    print("\nAGM Pilot UI:\n")
    print("1. View gardens")
    print("2. Create a new garden")
    print("3. Sync garden data")
    print("4. Start garden monitoring\n\n enter 'q' to exit")


# upload file to active S3 in 'garden'
def sync_garden():
    s3_client = boto3.client(
        's3',
        aws_access_key_id="",
        aws_secret_access_key="",
        # aws_session_token=SESSION_TOKEN
    )
    gardens_to_sync = 0
    active_gardens = [] # used to store names of all gardens that will be uploaded to
    for key, value in gardens.items():
        if value is "active":
            gardens_to_sync += 1
            active_gardens.append(key)
    if gardens_to_sync == 0:
        return False

    os.system('cls')
    print("Sync to", gardens_to_sync, "gardens?")
    ready_to_sync = input("\n\ny/n: ")

    if ready_to_sync == 'y':
        for target_garden in active_gardens:
            # first upload all image files from images folder
            for image in images:
                path = p
                path += "\\"
                path += image
                print(path)
                try:
                    with open(str(path), "rb") as f:
                        response = s3_client.upload_file(path, target_garden, str(image), ExtraArgs={ "ContentType": "image/jpeg"})
                except ClientError as e:
                    logging.error(e)
                    return False
            # finally upload the timestamp for this sync
            try:
                try:
                    fp = open("time_stamp.txt", "w")
                    fp.write(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
                    fp.close()
                except FileNotFoundError:
                    fp = open("time_stamp.txt", "w")
                    fp.write(strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime()))
                    fp.close()
                with open(str('time_stamp.txt'), "rb") as f:
                    response = s3_client.upload_file('time_stamp.txt', target_garden, str("time_stamp.txt"),
                                                     ExtraArgs={"ContentType": "text/html"})
            except ClientError as e:
                logging.error(e)
                return False
        return True
    else:
        return False


if __name__ == '__main__':
    bad_sync = False
    sync = False
    user_input = ""
    while 'q' not in user_input:
        os.system('cls')
        menu()
        if bad_sync:
            print(bcolors.WARNING + "Garden data could not be synchronized, check 'View gardens' to activate gardens before "
                  "synchronizing garden data." + bcolors.ENDC)
            time.sleep(.5)
        elif sync:
            print(bcolors.OKGREEN + "Garden data was successfully synchronized!" + bcolors.ENDC)
            time.sleep(.5)
        user_input = input("\n\n>    ")
        if user_input == '1':
            bad_sync = False
            sync = False
            select_garden(client)
        elif user_input == '2':
            bad_sync = False
            sync = False
            new_user_garden(client)
        elif user_input == '3':
            if sync_garden():
                sync = True
            else:
                bad_sync = True
        elif user_input == '4':
            print("not implemented")
        else:
            bad_sync = False
            sync = False
            continue
    print("goodbye!")
