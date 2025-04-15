import tkinter as tk
from tkinter import ttk, messagebox
import time

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

    status_var = tk.StringVar(value="Status: READY")
    status_display = tk.Label(panel_frame, textvariable=status_var, font=("Arial", 12), fg="green", anchor="w", bg="white")
    status_display.pack(fill=tk.X)

    ttk.Separator(panel_frame, orient='horizontal').pack(fill=tk.X, pady=5)

    def update_status(text, color):
        status_var.set(f"Status: {text}")
        status_display.config(fg=color)

    def start_action():
        update_status("RUNNING", "green")
        messagebox.showinfo("System Start", "Cleaning cycle started successfully.")

    def stop_action():
        update_status("STOPPED", "orange")
        messagebox.showwarning("System Stop", "Cleaning cycle stopped.")

    def emergency_stop_action():
        update_status("EMERGENCY STOPPED", "red")
        messagebox.showerror("EMERGENCY STOP", "Emergency stop activated! Device halted.")

    # TYPES OF FRUIT FRAME
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

    tk.Label(speed_frame, text="Time Now:", font=("Arial", 12), bg="white").pack(side=tk.LEFT, padx=(20, 5))

    time_label = tk.Label(speed_frame, font=("Arial", 12), bg="white", fg="#2c3e50")
    time_label.pack(side=tk.LEFT)

    def update_clock():
        current_time = time.strftime("%H:%M:%S")
        time_label.config(text=current_time)
        time_label.after(1000, update_clock)

    update_clock()

    
    # TIME REQUIRED 
    time_frame = tk.Frame(panel_frame, bg="white")
    time_frame.pack(fill=tk.X, pady=5)
    tk.Label(time_frame, text="Time Required:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    time_req = tk.Entry(time_frame, width=10)
    time_req.insert(0, "mm:ss")
    time_req.pack(side=tk.LEFT, padx=10)


    # CONVEYER FRAME
    conveyer_frame = tk.Frame(panel_frame, bg="white")
    conveyer_frame.pack(fill=tk.X, pady=5)
    tk.Label(conveyer_frame, text="Conveyer:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    tk.Button(conveyer_frame, text="ON", width=10, font=("Segoe UI", 11, "bold"),
              bg="#27ae60", fg="white", activebackground="#2ecc71", command=start_action).pack(side=tk.LEFT, padx=5)
    tk.Button(conveyer_frame, text="OFF", width=10, font=("Segoe UI", 11, "bold"),
              bg="#f39c12", fg="white", activebackground="#f1c40f", command=stop_action).pack(side=tk.LEFT, padx=5)


    # UV Light Frame
    uv_light_frame = tk.Frame(panel_frame, bg="white")
    uv_light_frame.pack(fill=tk.X, pady=5)
    tk.Label(uv_light_frame, text="UV Light:", font=("Arial", 12), bg="white").pack(side=tk.LEFT)
    tk.Button(uv_light_frame, text="ON", width=10, font=("Segoe UI", 11, "bold"),
              bg="#27ae60", fg="white", activebackground="#2ecc71", command=start_action).pack(side=tk.LEFT, padx=5)
    tk.Button(uv_light_frame, text="OFF", width=10, font=("Segoe UI", 11, "bold"),
              bg="#f39c12", fg="white", activebackground="#f1c40f", command=stop_action).pack(side=tk.LEFT, padx=5)


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
