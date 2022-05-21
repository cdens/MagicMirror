#! /usr/bin/env python3
# runmirror.py
# starts magic mirror (pipes output to log file) and listens for button press event to safely shut down raspberry pi

#! /usr/bin/env python3
# configures raspberry pi to listen to button hooked up to ground and GPIO pin to control Pi actions
    
import time, threading, subprocess, os
from datetime import datetime
import RPi.GPIO as GPIO
import traceback


        
class MirrorThread(threading.Thread):
    
    def __init__(self, button_num):
        super().__init__()
        
        self.button_num = button_num
        self._status = 0 #status = 0 means mirror is not running, status = 1 mirror is running
        self._locked = False
        
        logfilename = f"MMlogs/log_{datetime.strftime(datetime.utcnow(),'%Y%m%d%H%M')}.txt"
        self.logfileID = open(logfilename,'a')
        
        self.log_output("Program initiated, MirrorThread active")
        
        self.mirror_proc = None
        
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.button_num, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        
        #move to proper directory, activate mirror
        os.chdir('/home/pi/MagicMirror/')
        self.toggle_mirror_state() #turns mirror on since status is 0
        
        
    def change_status(self, status):
        if self._status != status:
            if status:
                # logfile = "mirror_log_" + datetime.utcnow().strftime("%Y%m%d%H%M%S") + ".log"
                # cmd = "npm run start"
                
                cmd = "DISPLAY=:0 nohup npm start &" #weird command workaround for error where cron can't start mirror
                self.mirror_proc = subprocess.Popen(cmd, shell=True, stdout=self.logfileID, stderr=self.logfileID)
                self.log_output("Mirror started")
                
            elif self.mirror_proc is not None: #verify that mirror command was executed
                self.mirror_proc.terminate() #terminate or kill method?
                cmd = "ps aux | grep node | grep -v 'color' | awk '{print $2}' | xargs sudo kill -9" #find and kill all NPM/electron processes to stop the mirror
                
                self.mirror_proc = subprocess.Popen(cmd, shell=True, stdout=self.logfileID, stderr=self.logfileID)
                self.log_output("Mirror terminated")
                
            self._status = status #update status
            
        
    def get_status(self):
        return self._status
        
        
    def toggle_mirror_state(self):
        status = self.get_status()
        self.log_output(f"switching mirror state: {status} to {not status}")
        self.change_status(not status)
        
    
    def log_output(self,message):
        line = datetime.strftime(datetime.utcnow(),'%Y-%m-%d %H:%M') + ':  ' + message + "\n"
        self.logfileID.write(line)
        
        
    def run(self):
        keepgoing = True
        while keepgoing:
            try:
                if not self._locked:
                    GPIO.wait_for_edge(self.button_num, GPIO.FALLING)
                    start = time.time()
                    time.sleep(0.2) #allowing voltage to drop
                
                    while GPIO.input(self.button_num) == GPIO.LOW: #waiting for button release
                        time.sleep(0.01)
                        
                    buttonTime = time.time() - start #getting button press duration
                                        
                    if buttonTime >= 6: #restarting mirror
                        self.log_output('Restarting!')
                        cmd = "sudo reboot"
                        subprocess.run(cmd.split())
                    elif buttonTime >= 2: #power off if button press > 2 seconds
                        self.log_output('Shutting down!')
                        cmd = "sudo shutdown -h now"
                        subprocess.run(cmd.split())
                    elif buttonTime >= 0.5: #start or stop mirror depending on state
                        self.toggle_mirror_state()
                    
                        
            except KeyboardInterrupt: #kill program for keyboard interrupt
                self.log_output('keyboard interrupt')
                self.change_status(0)   
                GPIO.cleanup()
                close(self.logfileID)
                keepgoing = False
                
            except Exception: #restart mirror, log exception
                self.log_output('ERROR: ' + traceback.format_exc())
                self.change_status(0)
                self.change_status(1)
        
            
if __name__ == "__main__":
    time.sleep(15) #wait 15 seconds for internet connection to come online before starting
    runMirror = MirrorThread(2) #initializes thread, starts magic mirror
    runMirror.start() #starts monitoring button for input signals

    
    