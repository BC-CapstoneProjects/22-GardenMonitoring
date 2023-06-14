import os
import tkinter as tk
from time import strftime, gmtime
from tkinter import messagebox, Toplevel, Canvas
import tkinter.ttk as ttk
from threading import Thread
from pilot import monitor
import botocore
from ttkthemes import ThemedTk
import webbrowser
import boto3
import requests
from aws_config import aws_exports
import configparser
from PIL import Image, ImageTk

"""
gui.py was built with the help from the following
Example script and assets, for testing the Azure ttk theme:
    - Original Author: rdbende
    - License: MIT license
    - Source: https://github.com/rdbende/ttk-widget-factory
Additional implementation and functionality is original work created by
Capstone, Group 7 (AGM), at Bellevue College.
"""


class App(ttk.Frame):

    def __init__(self, parent=None, **kwargs):
        """
        The constructor for the App class. Initializes a new App instance.
        :param master: Parent widget for this frame.
        :param kwargs: Additional arguments to pass to the parent class constructor.
        """

        self.current_image = None  # holds the current image

        config = configparser.ConfigParser()
        config.read('config.ini')

        aws_access_key_id = config.get('default', 'aws_access_key_id')
        aws_secret_access_key = config.get('default', 'aws_secret_access_key')

        session = boto3.Session(
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )
        print(session.profile_name)
        print(session.available_profiles)

        print("AWS_ACCESS_KEY_ID: ", os.environ.get("AWS_ACCESS_KEY_ID"))
        print("AWS_SECRET_ACCESS_KEY: ", os.environ.get("AWS_SECRET_ACCESS_KEY"))

        super().__init__(parent, **kwargs)
        # Initialize instance variables
        self.root = parent
        self.thread = None  # The thread that will run the monitoring function
        self.monitoring = False  # Flag to indicate whether monitoring is active
        self.switch_update_job = None # holds ID of update_switch job

        ttk.Frame.__init__(self)

        # Call the get_user method to retrieve the IAM user information
        self.user_info = ""

        # AccountInfo
        # Create a client for the IAM service
        self.iam_client = ""

        # cognito client to authenticate user log in
        self.cognito_idp_client = ""

        self.user_authenticated = False
        self.username = ""

        # define selected_garden var as a string
        self.selected_garden = tk.StringVar(value="Select Garden")

        # Make the app responsive
        for index in [0, 1, 2]:
            self.columnconfigure(index=index, weight=1)
            self.rowconfigure(index=index, weight=1)

        # Create value lists
        self.option_menu_list = ["", "Select Garden"]

        self.combo_list = ["Combobox", "Editable item 1", "Editable item 2"]
        self.readonly_combo_list = ["Readonly combobox", "Item 1", "Item 2"]

        # Create control variables
        self.progress_percentage = 0
        self.var_0 = tk.BooleanVar()
        self.var_1 = tk.BooleanVar(value=False)
        self.var_2 = tk.BooleanVar()
        self.var_3 = tk.IntVar(value=2)
        self.var_4 = tk.StringVar(value=self.option_menu_list[1])
        self.var_5 = tk.DoubleVar(value=self.progress_percentage)

        # Create widgets :)
        self.setup_widgets()

    def start_monitoring(self):
        """
        Start the monitoring function in a separate thread. If monitoring is already active, do nothing.

        :return: None
        """
        if self.thread is not None and self.thread.is_alive():
            messagebox.showinfo("System Alert", "Monitoring thread is already running")
            return

        self.monitoring = True  # Set the flag to indicate that monitoring should be active

        # Create a new thread that runs the monitoring function.
        # We pass self (the App instance) as an argument to the function, and set daemon=True
        # so that the thread will exit when the main program exits.
        self.thread = Thread(target=monitor, args=(self,), daemon=True)
        self.thread.start()  # Start the thread
        # Enable the switch
        self.switch.state(("!disabled",))  # Remove the "disabled" state
        self.update_switch()  # Start updating the switch state

    def stop_monitoring(self):
        """
        Signal the monitoring thread to stop.

        :return: None
        """
        self.monitoring = False  # Set the flag to indicate that monitoring should stop
        print("Tello disconnecting")
        # Disable the switch
        self.switch.state(("disabled",))  # Add the "disabled" state
        # Cancel the switch update job
        if self.switch_update_job is not None:
            self.root.after_cancel(self.switch_update_job)
            self.switch_update_job = None

    def is_monitoring(self):
        """
        Check if the monitoring thread is still running.

        :return: True if the monitoring thread is alive, False otherwise.
        """
        if self.thread is None:  # If the thread was never started, it's not running
            # Disable the switch
            self.switch.state(("disabled",))  # Add the "disabled" state
            return False
        elif not self.thread.is_alive():  # If the thread has finished running
            # Disable the switch
            self.switch.state(("disabled",))  # Add the "disabled" state
            # Cancel the switch update job
            if self.switch_update_job is not None:
                self.root.after_cancel(self.switch_update_job)
                self.switch_update_job = None
        return self.thread.is_alive()  # Check if the thread is alive

    def update_switch(self):
        """
        Update the state of the switch to reflect whether monitoring is active.

        :return: None
        """
        if self.is_monitoring():
            # Monitoring is active, enable the switch
            self.switch.state(("!disabled",))  # Remove the "disabled" state
        else:
            # Monitoring is not active, disable the switch
            self.switch.state(("disabled",))  # Add the "disabled" state

        # Schedule the next update
        self.switch_update_job = self.root.after(1000, self.update_switch)  # Check the state every second

    def update_tree(self, *args):
        # Clear the tree
        for i in self.treeview.get_children():
            self.treeview.delete(i)

        config = configparser.ConfigParser()
        config.read('config.ini')

        aws_access_key_id = config.get('default', 'aws_access_key_id')
        aws_secret_access_key = config.get('default', 'aws_secret_access_key')

        session = boto3.Session(
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )

        # Get the objects from the selected garden (bucket)
        s3 = session.resource('s3')
        bucket = s3.Bucket(self.selected_garden.get())
        for obj in bucket.objects.all():
            # Insert the object into the tree
            self.treeview.insert('', 'end', text=obj.key, values=obj.last_modified)

    def setup_widgets(self):

        # Create a Frame for the Checkbuttons
        self.account_frame = ttk.LabelFrame(self, text="Account", padding=(20, 10))
        self.account_frame.grid(
            row=1, column=0, padx=(20, 10), pady=(20, 10), sticky="nsew"
        )

        self.account_name = ttk.Label(
            self.account_frame, text=str("Username:")
        )
        self.account_name.grid(row=1, column=0, padx=5, pady=10, sticky="nsew")

        self.account_entry = ttk.Entry(
            self.account_frame
        )
        self.account_entry.grid(row=2, column=0, padx=5, pady=10, sticky="nsew")

        self.password = ttk.Label(
            self.account_frame, text=str("Password:")
        )
        self.password.grid(row=3, column=0, padx=5, pady=10, sticky="nsew")

        self.password_entry = ttk.Entry(
            self.account_frame
        )
        self.password_entry.grid(row=4, column=0, padx=5, pady=10, sticky="nsew")

        # log in Button
        self.login_button = ttk.Button(self.account_frame, text="Log In", command=self.authenticate_user)
        self.login_button.grid(row=5, column=0, padx=5, pady=40, sticky="nsew")

        # text gets updated after user logs in and is authenticated
        self.username_label = ttk.Label(self.account_frame, text="")
        self.username_label.grid(row=6, column=0, padx=5, pady=40, sticky="nsew")

        self.check_2 = ttk.Checkbutton(
            self.account_frame, text="Allow automatic uploads to AWS", variable=self.var_1
        )
        self.check_2.grid(row=9, column=0, padx=5, pady=50, sticky="nsew")

        self.dashboard = ttk.Button(self.account_frame, style="Accent.TButton", text="Go to AGM Dashboard",
                                    command=lambda: webbrowser.open("http://localhost:3000/"))
        self.dashboard.grid(row=8, column=0, padx=5, pady=20, sticky="nsew")
        # self.dashboard.grid_remove()  # initially hide the button


        # log out Button
        self.logout_button = ttk.Button(self.account_frame, text="Log out", command=self.logout)
        self.logout_button.grid(row=9, column=0, padx=5, pady=20, sticky="nsew")
        self.logout_button.grid_remove()  # initially hide the button

        # Create a Frame for input widgets
        self.widgets_frame = ttk.Frame(self, padding=(0, 0, 0, 10))
        self.widgets_frame.grid(
            row=0, column=1, padx=10, pady=(30, 10), sticky="nsew", rowspan=3
        )
        self.widgets_frame.columnconfigure(index=0, weight=1)

        # Entry
        self.garden_entry = ttk.Entry(self.widgets_frame)
        self.garden_entry.insert(0, "Enter new or existing garden name")
        self.garden_entry.grid(row=1, column=0, columnspan=2, padx=5, pady=(0, 10), sticky="ew")

        # Add Garden Button
        self.button2 = ttk.Button(self.widgets_frame, text="Add Garden",
                                  command=lambda: self.new_user_garden(self.garden_entry.get()))
        self.button2.grid(row=2, columnspan=1, padx=5, pady=10, sticky="nsew")

        # Remove Garden Button
        self.button3 = ttk.Button(self.widgets_frame, text="Remove Garden",
                                  command=lambda: self.remove_user_garden(self.garden_entry.get()))
        self.button3.grid(row=2, column=1, padx=5, pady=10, sticky="nsew")

        # OptionMenu
        self.optionmenu = ttk.OptionMenu(
            self.widgets_frame, self.selected_garden, *self.option_menu_list
        )
        self.optionmenu.grid(row=5, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # Accentbutton, uses 'monitoring' function imported from pilot.py
        self.accentbutton = ttk.Button(
            self.widgets_frame, text="Start Garden Monitoring", style="Accent.TButton",
            command=self.start_monitoring
        )

        self.accentbutton.grid(row=7, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # Togglebutton
        # sync local garden data with AWS garden data
        self.toggle_state = tk.IntVar() # this stores togglebutton's state (checked/unchecked)
        self.togglebutton = ttk.Checkbutton(
            self.widgets_frame, text="Sync local data", style="Toggle.TButton", command=self.upload_images,
            variable=self.toggle_state
        )
        self.togglebutton.grid(row=8, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # Switch
        self.switch = ttk.Checkbutton(
            self.widgets_frame, text="Tello Connected", style="Switch.TCheckbutton", state="disabled"
        )
        self.switch.grid(row=9, column=0, padx=5, pady=10, sticky="nsew")

        # Panedwindow
        self.paned = ttk.PanedWindow(self)
        self.paned.grid(row=1, column=2, pady=(25, 5), sticky="nsew", rowspan=3)

        # Pane #1
        self.pane_1 = ttk.Frame(self.paned, padding=5)
        self.paned.add(self.pane_1, weight=1)

        # Scrollbar
        self.scrollbar = ttk.Scrollbar(self.pane_1)
        self.scrollbar.pack(side="right", fill="y")

        # Treeview
        self.treeview = ttk.Treeview(
            self.pane_1,
            selectmode="browse",
            yscrollcommand=self.scrollbar.set,
            columns=(1, 2),
            height=10,
        )
        self.treeview.pack(expand=True, fill="both")
        self.scrollbar.config(command=self.treeview.yview)

        # Treeview columns
        self.treeview.column("#0", anchor="w", width=120)
        self.treeview.column(1, anchor="w", width=120)
        self.treeview.column(2, anchor="w", width=120)

        # Treeview headings
        self.treeview.heading("#0", text="Plant ID", anchor="center")
        self.treeview.heading(1, text="Date and time of sync", anchor="center")
        # self.treeview.heading(2, text="Column 3", anchor="center")

        # Defines a callback function when the selected garden changes and updates the treeview
        self.selected_garden.trace_add('write', self.update_tree)

        # Notebook, pane #2
        self.pane_2 = ttk.Frame(self.paned, padding=5)
        self.paned.add(self.pane_2, weight=3)

        # Notebook, pane #2
        self.notebook = ttk.Notebook(self.pane_2)
        self.notebook.pack(fill="both", expand=True)

        # Tab #1
        self.tab_1 = ttk.Frame(self.notebook)
        for index in [0, 1]:
            self.tab_1.columnconfigure(index=index, weight=1)
            self.tab_1.rowconfigure(index=index, weight=1)
        self.notebook.add(self.tab_1, text="Monitoring Progress")

        # Progressbar
        self.progress = ttk.Progressbar(
            self.tab_1, value=0, variable=self.var_5, mode="determinate"
        )
        self.progress.grid(row=0, column=0, columnspan=2, padx=(10, 20), pady=(20, 0), sticky="ew")

        # Label
        self.label = ttk.Label(
            self.tab_1,
            text=f"Current progress =  {self.progress_percentage}%",
            justify="center",
            font=("-size", 15, "-weight", "bold"),
        )
        self.label.grid(row=1, column=0, pady=10, columnspan=2)

        # Tab #2
        self.tab_2 = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_2, text="Local image preview")

        # Create a scrollbar
        self.scrollbar = ttk.Scrollbar(self.tab_2)
        self.scrollbar.pack(side="right", fill="y")

        # Create a canvas
        self.canvas = Canvas(self.tab_2, yscrollcommand=self.scrollbar.set)
        self.canvas.pack(side="left")

        # Configure the scrollbar
        self.scrollbar.config(command=self.canvas.yview)

        # Add another frame inside the canvas
        self.inner_frame = ttk.Frame(self.canvas)
        self.canvas.create_window((0, 0), window=self.inner_frame, anchor="nw")

        self.display_images()

        self.inner_frame.bind("<Configure>", lambda event: self.canvas.configure(scrollregion=self.canvas.bbox("all")))

        # Tab #3
        self.logs = ttk.Frame(self.notebook)
        self.notebook.add(self.logs, text="Monitoring Logs")

        # Sizegrip
        self.sizegrip = ttk.Sizegrip(self)
        self.sizegrip.grid(row=100, column=100, padx=(0, 5), pady=(0, 5))

    def display_images(self):
        # Get list of all image files in 'images' directory
        image_dir = 'images/'
        image_files = [f for f in os.listdir(image_dir) if f.endswith('.png') or f.endswith('.jpg')]

        # Grid dimensions
        columns = 1  # We use only one column since we're scrolling vertically

        # Loop over image files
        for index, image_file in enumerate(image_files):
            # Open image file
            img = Image.open(os.path.join(image_dir, image_file))

            # Convert to PhotoImage
            photo_img = ImageTk.PhotoImage(img)

            # Create a label with image
            img_label = ttk.Label(self.inner_frame, image=photo_img)

            # This line makes sure the image isn't garbage collected
            img_label.image = photo_img

            # Add label to grid
            row, col = divmod(index, columns)
            img_label.grid(row=row, column=col, padx=5, pady=5)


    def authenticate_user(self):
        # AccountInfo
        # Create a client for the IAM service
        self.iam_client = boto3.client('iam')

        # cognito client to authenticate user log in
        self.cognito_idp_client = boto3.client('cognito-idp')

        # Call the get_user method to retrieve the IAM user information
        self.user_info = self.iam_client.get_user()

        username = self.account_entry.get()
        password = self.password_entry.get()

        try:
            response = self.cognito_idp_client.initiate_auth(
                AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': username,
                    'PASSWORD': password
                },
                ClientId=aws_exports['ClientId']
            )
        except self.cognito_idp_client.exceptions.NotAuthorizedException:
            messagebox.showerror("Error", "Invalid username or password")
        except self.cognito_idp_client.exceptions.UserNotFoundException:
            messagebox.showerror("Error", "User not found")
        except Exception as e:
            print("Error", f"Something went wrong: {e}")
            messagebox.showerror("Error", f"Something went wrong: {e}")
        else:
            if response.get('AuthenticationResult').get('AccessToken'):
                messagebox.showinfo("Success", "Logged in successfully")
                self.user_authenticated = True
                self.username = username
                self.username_label.config(text=f'Welcome, {username}!')
                self.dashboard.grid(row=7, column=0, padx=5, pady=20, sticky="nsew")
                self.dashboard.config(text="Go to my AGM Dashboard")
                self.logout_button.grid(row=10, column=0, padx=5, pady=20, sticky="nsew")  # Show logout button
                self.update_option_list()
                # Hide these elements
                self.account_name.grid_remove()
                self.account_entry.grid_remove()
                self.password.grid_remove()
                self.password_entry.grid_remove()
                self.login_button.grid_remove()

    def logout(self):
        # Display all hidden elements
        print("Logout method called.")
        self.user_authenticated = False
        self.username = ""
        self.account_name.grid()
        self.account_entry.grid()
        self.password.grid()
        self.password_entry.grid()
        self.login_button.grid()
        self.dashboard.config(text="Go to AGM Dashboard")

        #clear the options menu
        self.option_menu_list.clear()
        self.optionmenu['menu'].delete(0, 'end')

        self.logout_button.grid_forget()  # hide the logout button
        self.username_label.config(text="")  # clear the username label

    def update_option_list(self):
        # Make API GET request to get garden names for the current user
        response = requests.get(f'http://localhost:9000/getGardenNames/{self.username}')
        # check response status code
        if response.status_code != 200:
            print(f"Error getting garden names for {self.username}: {response.text}")
            return

        garden_names_api = response.json()

        # Refreshing the option menu
        self.optionmenu['menu'].delete(0, 'end')

        # create a list of garden names
        # include dictionaries in the option_menu_list and then extract the "name" value from each dictionary
        self.option_menu_list = [{"name": name, "garden id": i + 1} for i, name in enumerate(garden_names_api)]

        for garden in self.option_menu_list:
            self.optionmenu['menu'].add_command(label=garden['name'],
                                                command=lambda value=garden['name']: self.selected_garden.set(value))

    def new_user_garden(self, garden_name):
        # Make API POST request to create new garden for the current user
        response = requests.post(f'http://localhost:9000/createGarden/{self.username}/{garden_name}')
        # check the response from the API
        if response.status_code != 200:
            print(f"Error creating new garden named {garden_name}: {response}")
            return
        # add new garden to the option list
        self.update_option_list()
        print(response)

    def remove_user_garden(self, garden_name):
        # Make API DELETE request to delete a garden for the current user
        response = requests.delete(f'http://localhost:9000/deleteGarden/{self.username}/{garden_name}')
        # check the response from the API
        if response.status_code != 200:
            print(f"Error deleting garden named {garden_name}: {response}")
            return

        # Update the option menu list
        self.update_option_list()
        print(response)

    # uploads all images from 'images' folder to s3 bucket with name in selected_garden.get()
    def upload_images(self):
        # update text of toggle button
        self.togglebutton.config(text='Uploading to AWS, do not close AGM-Pilot')
        self.update_idletasks() # force tkinter to update GUI with text changes
        print(self.selected_garden.get())

        # get all images in the image directory
        image_folder = './images'
        image_files = [f for f in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, f))]

        time_stamp_written = False

        for image_file in image_files:
            file_path = os.path.join(image_folder, image_file)

            # generate a presigned URL using the putImage API route
            url = f'http://localhost:9000/putImage/{self.username}/{self.selected_garden.get()}/{image_file}'
            response = requests.put(url)

            if response.status_code == 200:
                print(f'Successfully generated presigned URL for {image_file}')
                presigned_url = response.json()['presignedUrls']

                # upload the image to the presigned URL
                with open(file_path, 'rb') as image:
                    headers = {"Content-Type": "image/jpeg"}  # AWS needs this header or image data will become corrupt
                    image_data = image.read()
                    upload_response = requests.put(presigned_url, data=image_data, headers=headers)

                    if upload_response.status_code == 200:
                        print(f'Successfully uploaded {image_file}')
                        if not time_stamp_written:
                            # upload new time_stamp.txt
                            time_stamp_written = self.upload_timestamp()
                    else:
                        print(f'Failed to upload {image_file}')
            else:
                print(f'Failed to generate presigned URL for {image_file}')

        self.togglebutton.grid_forget()
        self.togglebutton.config(text='Sync local data')
        self.togglebutton.grid(row=8, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")  # re-grid the button
        self.toggle_state.set(0)
        self.update_tree() # update the Plant ID's and date/time information in the treeview
        self.update_idletasks()  # update GUI

    # creates and uploads a new time_stamp to the current garden
    # returns bool
    def upload_timestamp(self):
        time_stamp_written = False

        # generate a presigned URL using the putImage API route
        url = f'http://localhost:9000/putImage/{self.username}/{self.selected_garden.get()}/time_stamp.txt'
        response = requests.put(url)

        if response.status_code == 200:
            print(f'Successfully generated presigned URL for timestamp.')
            presigned_url = response.json()['presignedUrls']

            # create and upload a new time_stamp.txt to the presigned URL
            timestamp = strftime("%a-%d-%b-%Y_%H:%M:%S_+0000", gmtime())
            headers = {'Content-Type': 'text/plain'}
            timestamp_upload_response = requests.put(presigned_url, data=timestamp, headers=headers)
            if timestamp_upload_response.status_code == 200:
                print(f'Successfully uploaded timestamp.')
                return True

            else:
                print(f'Failed to upload timestamp.')
                return False
        else:
            print(f'Failed to generate presigned URL for timestamp.')


if __name__ == "__main__":
    root = tk.Tk()
    root.title("AGM-Pilot")

    # Simply set the theme
    root.tk.call("source", "azure.tcl")
    root.tk.call("set_theme", "dark")

    app = App(root)
    app.pack(fill="both", expand=True)

    # Set a minsize for the window, and place it in the middle
    root.update()
    root.minsize(root.winfo_width(), root.winfo_height())
    x_cordinate = int((root.winfo_screenwidth() / 2) - (root.winfo_width() / 2))
    y_cordinate = int((root.winfo_screenheight() / 2) - (root.winfo_height() / 2))
    root.geometry("+{}+{}".format(x_cordinate, y_cordinate - 20))

    root.mainloop()
