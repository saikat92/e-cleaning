import tkinter as tk
from tkinter import ttk, messagebox

# Simulated Bluetooth paired device name
PAIRED_DEVICE_NAME = "Android_ECleanApp"

# Root window
root = tk.Tk()
root.title("Bluetooth Status")
root.geometry("400x200")
root.resizable(False, False)

# Bluetooth status frame
status_frame = tk.Frame(root, padx=20, pady=20)
status_frame.pack(fill=tk.BOTH, expand=True)

# Bluetooth status label
status_label = tk.Label(status_frame, text="🔵 Bluetooth Enabled\nReady to pair...", font=("Arial", 14), fg="blue")
status_label.pack(pady=20)

# Simulate Bluetooth pairing
def simulate_pairing():
    # Update label to show pairing success
    status_label.config(text=f"✅ {PAIRED_DEVICE_NAME} Paired!", fg="green")
    
    # Delay before launching the main panel
    root.after(2000, launch_device_panel)

# Pairing Button (for simulation, replace this with actual pairing callback)
pair_btn = tk.Button(status_frame, text="Simulate Pairing", command=simulate_pairing)
pair_btn.pack(pady=10)


# E-Cleaning Panel UI (from your previous layout)
def launch_device_panel():
    root.destroy()  # Close Bluetooth status window
    open_device_panel()


def open_device_panel():
    panel = tk.Tk()
    panel.title("E-Cleaning Device Panel")
    panel.geometry("500x400")
    panel.resizable(False, False)
    panel.configure(bg="#f0f0f0")

    panel_frame = tk.Frame(panel, bd=2, relief=tk.RIDGE, padx=10, pady=10, bg="white")
    panel_frame.pack(padx=20, pady=20, fill=tk.BOTH, expand=True)

    title_label = tk.Label(panel_frame, text="E-Cleaning Device Panel", font=("Arial", 16, "bold"), bg="white")
    title_label.pack(pady=(0, 10))

    status_label = tk.Label(panel_frame, text="Status: READY", font=("Arial", 12), fg="green", anchor="w", bg="white")
    status_label.pack(fill=tk.X)

    ttk.Separator(panel_frame, orient='horizontal').pack(fill=tk.X, pady=5)

    # --- Button actions with alerts ---
    def start_action():
        messagebox.showinfo("System Start", "Cleaning cycle started successfully.")

    def stop_action():
        messagebox.showwarning("System Stop", "Cleaning cycle stopped.")

    def emergency_stop_action():
        messagebox.showerror("EMERGENCY STOP", "Emergency stop activated! Device halted.")

    #TYPES OF FRUIT FRAME
    type_frame = tk.Frame(panel_frame, bg="white")
    type_frame.pack(fill=tk.X, pady=5)
    tk.Label(type_frame, text="Fruit/Vegetable Type:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    fruit_options = ["Apple", "Banana", "Carrot", "Tomato", "Potato"]
    fruit_combo = ttk.Combobox(type_frame, values=fruit_options, state="readonly")
    fruit_combo.set("Select")
    fruit_combo.pack(side=tk.LEFT, padx=10)

    # SPEED CONTROL INPUT   
    speed_frame = tk.Frame(panel_frame, bg="white")
    speed_frame.pack(fill=tk.X, pady=5)
    tk.Label(speed_frame, text="Motor Speed:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    motor_speed = tk.Entry(speed_frame, width=10)
    motor_speed.insert(0, "### rpm")
    motor_speed.pack(side=tk.LEFT, padx=10)

    #CONVEYER FRAME
    conveyer_frame = tk.Frame(panel_frame, bg="white")
    conveyer_frame.pack(fill=tk.X, pady=5)
    tk.Label(conveyer_frame, text="Conveyer:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    tk.Button(conveyer_frame, text="Start", width=10, font=("Segoe UI", 11, "bold"),
              bg="#27ae60", fg="white", activebackground="#2ecc71", command=start_action).pack(side=tk.LEFT, padx=5)
    tk.Button(conveyer_frame, text="Stop", width=10, font=("Segoe UI", 11, "bold"),
              bg="#f39c12", fg="white", activebackground="#f1c40f", command=stop_action).pack(side=tk.LEFT, padx=5)
    tk.Button(conveyer_frame, text="Emergency Stop", width=15, font=("Segoe UI", 11, "bold"),
              bg="#c0392b", fg="white", activebackground="#e74c3c", command=emergency_stop_action).pack(side=tk.LEFT, padx=5)

    # UV Light Frame
    uv_light_frame = tk.Frame(panel_frame, bg="white")
    uv_light_frame.pack(fill=tk.X, pady=5)
    tk.Label(uv_light_frame, text="UV Light:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    tk.Button(uv_light_frame, text="Start", width=10, font=("Segoe UI", 11, "bold"),
              bg="#27ae60", fg="white", activebackground="#2ecc71", command=start_action).pack(side=tk.LEFT, padx=5)
    tk.Button(uv_light_frame, text="Stop", width=10, font=("Segoe UI", 11, "bold"),
              bg="#f39c12", fg="white", activebackground="#f1c40f", command=stop_action).pack(side=tk.LEFT, padx=5)
    tk.Button(uv_light_frame, text="Emergency Stop", width=15, font=("Segoe UI", 11, "bold"),
              bg="#c0392b", fg="white", activebackground="#e74c3c", command=emergency_stop_action).pack(side=tk.LEFT, padx=5)


    # bottom line
    # bottom_frame = tk.Frame(panel_frame, bg="white")
    # bottom_frame.pack(fill=tk.X, pady=(20, 0))
    # tk.Button(bottom_frame, text="View Logs ℹ️", width=15).pack(side=tk.LEFT, padx=5)
    # tk.Button(bottom_frame, text="Settings ⚙️", width=15).pack(side=tk.RIGHT, padx=5)
    # Bottom Buttons
    bottom_frame = tk.Frame(panel_frame, bg="white")
    bottom_frame.pack(fill=tk.X, pady=10, padx=20)
    tk.Button(bottom_frame, text="View Logs", font=("Segoe UI", 10, "bold"), width=15,
              bg="#bdc3c7", relief=tk.GROOVE).pack(side=tk.LEFT)
    tk.Button(bottom_frame, text="Settings ⚙️", font=("Segoe UI", 10, "bold"), width=15,
              bg="#95a5a6", relief=tk.GROOVE).pack(side=tk.RIGHT)

    panel.mainloop()


# Start the Bluetooth status UI
root.mainloop()
