#Magic Mirror Configuration

The included files are my personal configuration for a magic mirror, which uses a Raspberry Pi running Raspbian and the open source Magic Mirror software (for information on installing the base software and third party modules, see https://magicmirror.builders/). 

The magic mirror can be turned on/off and reset using a single button connected to the raspberry pi, and these inputs, as well as error handling, are coordinated with a python script. The python script is executed on startup via a cron job.