ts
==
`ts` stands for "time sheet" or "time slips", after [Sage Timeslips](http://www.sagetimeslips.com), though `ts` is not related to Sage.

## Purpose
`ts` generates a timesheet in a format intended to be simple to pass to a program like `gnuplot`, so that eventually you can visualize your work data, realize how long you sit in front of your computer, etc.

## Usage
`ts` is intended to be used at work. While at work, I might issue commands as follows:

	$ ts in
	17:40		*in*
	$ ts overhead
	17:43	[00:03]	overhead
	$ ts out
	17:43		*out*

### Viewing the log
To view today's timesheet, execute `ts -l` or `ts -l 1`. The result should look like the following:

	# Wed 06/01/11
	13:35		*in*
	13:44	[00:09]	overhead
	15:11	[01:27]	www-migration
	15:23	[00:12]	overhead
	16:13	[00:50]	proj-mgmt
	17:28	[01:15]	www-migration
	17:39	[00:11]	portal-apps
	17:42	[00:03]	overhead
	17:43		*out*	

### Summing hours
Similarly, to sum today's hours spent on individual tasks, execute `ts -s` or `ts -s 1`:

	# Wed 06/01/11
	00:11	portal-apps
	00:24	overhead
	00:50	proj-mgmt
	02:42	www-migration

### Viewing and summing past days
Executing `ts -n` will print the days in the timesheet, prefixed with a number to pass to the `ts -l` and `ts -s` commands. The most recent day is numbered 1:

	     5	# Fri 05/20/11
	     4	# Mon 05/23/11
	     3	# Wed 05/25/11
	     2	# Fri 05/27/11
	     1	# Wed 06/01/11

Given the above information, if I wanted to see the timesheet for Friday, May 20, I would execute `ts -l 5`.

## Todo
* `ts` is a Bash shell script. Everything written in shell script feels like a hack. Granted I chose this in part to remind myself how to use `awk` and other Unix tools, but it might make sense for me to port this to a more reasonable language later.
* Add output to `gnuplot` features.
