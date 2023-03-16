import tkinter as tk
import tkinter.ttk as ttk
from ttkthemes import ThemedTk
import webbrowser

# Just simply import the azure.tcl file


button_names = {
    "0": "1. View gardens",
    "1": "2. Create a new garden",
    "2": "3. Sync garden data",
    "3": "4. Start garden monitoring",
}

"""
guitest.py was built with the help from the following
Example script for testing the Azure ttk theme
Original Author: rdbende
License: MIT license
Source: https://github.com/rdbende/ttk-widget-factory
"""


# import tkinter as tk
# from tkinter import ttk

class App(ttk.Frame):

    def __init__(self, parent):
        ttk.Frame.__init__(self)

        # Make the app responsive
        for index in [0, 1, 2]:
            self.columnconfigure(index=index, weight=1)
            self.rowconfigure(index=index, weight=1)

        # Create value lists
        self.option_menu_list = ["", "Select Garden", "Garden 1", "Garden 2"]
        self.combo_list = ["Combobox", "Editable item 1", "Editable item 2"]
        self.readonly_combo_list = ["Readonly combobox", "Item 1", "Item 2"]

        # Create control variables
        self.progress_percentage = 50.0
        self.var_0 = tk.BooleanVar()
        self.var_1 = tk.BooleanVar(value=False)
        self.var_2 = tk.BooleanVar()
        self.var_3 = tk.IntVar(value=2)
        self.var_4 = tk.StringVar(value=self.option_menu_list[1])
        self.var_5 = tk.DoubleVar(value=self.progress_percentage)

        # Create widgets :)
        self.setup_widgets()

    def setup_widgets(self):

        # Create a Frame for the Checkbuttons
        self.account_frame = ttk.LabelFrame(self, text="Account", padding=(20, 10))
        self.account_frame.grid(
            row=1, column=0, padx=(20, 10), pady=(20, 10), sticky="nsew"
        )

        # AccountInfo
        self.account_name = ttk.Label(
            self.account_frame, text="Name:      user1"
        )
        self.account_name.grid(row=1, column=0, padx=5, pady=10, sticky="nsew")

        self.account_email = ttk.Label(
            self.account_frame, text="email:      user1@test.com"
        )
        self.account_email.grid(row=2, column=0, padx=5, pady=10, sticky="nsew")

        self.check_2 = ttk.Checkbutton(
            self.account_frame, text="Allow automatic uploads to AWS", variable=self.var_1
        )
        self.check_2.grid(row=3, column=0, padx=5, pady=50, sticky="nsew")

        self.dashboard = ttk.Button(self.account_frame, style="Accent.TButton", text="Go to my AGM Dashboard",
                                    command=lambda: webbrowser.open("http://localhost:3000/garden"))
        self.dashboard.grid(row=4, column=0, padx=5, pady=20, sticky="nsew")

        # log out Button
        self.button = ttk.Button(self.account_frame, text="Log out")
        self.button.grid(row=6, column=0, padx=5, pady=20, sticky="nsew")

        # Create a Frame for input widgets
        self.widgets_frame = ttk.Frame(self, padding=(0, 0, 0, 10))
        self.widgets_frame.grid(
            row=0, column=1, padx=10, pady=(30, 10), sticky="nsew", rowspan=3
        )
        self.widgets_frame.columnconfigure(index=0, weight=1)

        # Entry
        self.entry = ttk.Entry(self.widgets_frame)
        self.entry.insert(0, "Garden Name")
        self.entry.grid(row=1, column=0, columnspan=2, padx=5, pady=(0, 10), sticky="ew")

        # Add Garden Button
        self.button2 = ttk.Button(self.widgets_frame, text="Add Garden")
        self.button2.grid(row=2, columnspan=1, padx=5, pady=10, sticky="nsew")
        # Remove Garden Button
        self.button3 = ttk.Button(self.widgets_frame, text="Remove Garden")
        self.button3.grid(row=2, column=1, padx=5, pady=10, sticky="nsew")

        # # Spinbox
        # self.spinbox = ttk.Spinbox(self.widgets_frame, from_=0, to=100, increment=0.1)
        # self.spinbox.insert(0, "Spinbox")
        # self.spinbox.grid(row=1, column=0, padx=5, pady=10, sticky="ew")

        # Combobox
        # self.combobox = ttk.Combobox(self.widgets_frame, values=self.combo_list)
        # self.combobox.current(0)
        # self.combobox.grid(row=6, column=0, columnspan=2, padx=5, pady=10, sticky="ew")

        # Read-only combobox
        # self.readonly_combo = ttk.Combobox(
        #     self.widgets_frame, state="readonly", values=self.readonly_combo_list
        # )
        # self.readonly_combo.current(0)
        # self.readonly_combo.grid(row=3, column=0, columnspan=2, padx=5, pady=10, sticky="ew")

        # Menu for the Menubutton
        # self.menu = tk.Menu(self)
        # self.menu.add_command(label="Menu item 1")
        # self.menu.add_command(label="Menu item 2")
        # self.menu.add_separator()
        # self.menu.add_command(label="Menu item 3")
        # self.menu.add_command(label="Menu item 4")

        # # Menubutton
        # self.menubutton = ttk.Menubutton(
        #     self.widgets_frame, text="Menubutton", menu=self.menu, direction="below"
        # )
        # self.menubutton.grid(row=4, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # OptionMenu
        self.optionmenu = ttk.OptionMenu(
            self.widgets_frame, self.var_4, *self.option_menu_list
        )
        self.optionmenu.grid(row=5, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # Accentbutton
        self.accentbutton = ttk.Button(
            self.widgets_frame, text="Start Garden Monitoring", style="Accent.TButton"
        )
        self.accentbutton.grid(row=7, column=0, columnspan=2, padx=5, pady=10, sticky="nsew")

        # Togglebutton
        self.togglebutton = ttk.Checkbutton(
            self.widgets_frame, text="Ready", style="Toggle.TButton"
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
        self.treeview.heading("#0", text="Garden Name", anchor="center")
        self.treeview.heading(1, text="Status", anchor="center")
        # self.treeview.heading(2, text="Column 3", anchor="center")

        # Define treeview data
        treeview_data = [
            ("", 1, f"Garden A", "Inactive"),
            (1, 2, "plant1", "Not_Captured"),
            (1, 3, "plant2", "Not_Captured"),
            (1, 4, "plant3", "Not_Captured"),
            (1, 5, "plant4", "Not_Captured"),
            ("", 6, "Garden B", "Inactive"),
            (6, 7, "plant", "Not_Captured"),
            (6, 8, "Sub-Garden B", "Inactive"),
            (8, 9, "plant", "Not_Captured"),
            (8, 10, "plant", "Not_Captured"),
            (8, 11, "plant", "Not_Captured"),
            (6, 12, "plant", "Not_Captured"),
            (6, 13, "plant", "Not_Captured")
        ]

        # Insert treeview data
        for item in treeview_data:
            self.treeview.insert(
                parent=item[0], index="end", iid=item[1], text=item[2], values=item[3]
            )
            if item[0] == "" or item[1] in {8, 21}:
                self.treeview.item(item[1], open=True)  # Open parents

        # Select and scroll
        self.treeview.selection_set(10)
        self.treeview.see(7)

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

        # Scale
        # self.scale = ttk.Scale(
        #     self.tab_1,
        #     from_=100,
        #     to=0,
        #     variable=self.var_5,
        #     command=lambda event: self.var_5.set(self.scale.get()),
        # )
        # self.scale.grid(row=0, column=0, padx=(20, 10), pady=(20, 0), sticky="ew")

        # Progressbar
        self.progress = ttk.Progressbar(
            self.tab_1, value=0, variable=self.var_5, mode="determinate"
        )
        self.progress.grid(row=0, column=0, columnspan=2, padx=(10, 20), pady=(20, 0), sticky="ew")

        # Label
        self.label = ttk.Label(
            self.tab_1,
            text=f"Current progress =  {self.var_5}%",
            justify="center",
            font=("-size", 15, "-weight", "bold"),
        )
        self.label.grid(row=1, column=0, pady=10, columnspan=2)

        # Tab #2
        self.tab_2 = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_2, text="Garden 1 Images")

        # Tab #3
        self.tab_3 = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_3, text="Garden 2 Images")

        # Tab #4
        self.logs = ttk.Frame(self.notebook)
        self.notebook.add(self.logs, text="Monitoring Logs")

        # Sizegrip
        self.sizegrip = ttk.Sizegrip(self)
        self.sizegrip.grid(row=100, column=100, padx=(0, 5), pady=(0, 5))


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
