#!/bin/bash
# ts - for timeslips/timesheet
# NOTE: This is drrty. >:)
timesheet="/Users/andrus/work/timesheet.log"
today=`date "+%a %D"`
seconds=`date +%S`
clock=`date -v-${seconds}S +%H:%M`
create_today=`grep <$timesheet "$today" | wc -l`
case $1 in
	'')
		echo "USAGE: $0 {job}"
		echo "EXAMPLE: $0 overhead"
		exit
		;;
	'-L')	# `cat' the entire timesheet
		cat $timesheet
		exit
		;;
	'-l')	# `cat' today's timesheet
		lines=`wc -l <$timesheet | cut -c 7-`
		if [ "$2" == '' ]; then
			day=$today
		else
			day=`$0 -n | awk -v day="$2" '$1 == day { printf("%s %s %s\n", $2, $3, $4) }'`
		fi
		line=`grep -n -e "$day" <$timesheet | grep -o -e [0-9]*`
		if [ "$line" == '' ]; then
			echo "Error: no timesheet for requested day."
			exit
		fi
		tail -n `expr $lines - $line + 1` $timesheet | awk '{ if ($0 == "") { exit } else { print $0 } }'
		exit
		;;
	'-n')	# number the days
		cat $timesheet | grep -o -E "^# [a-zA-Z]{3} ([0-9]{2}/*)+" | nl -ba | sort -nr | cut -f2- | nl -ba | sort -nr
		exit
		;;
	'-s')	# sum the time spent on each task for the requested date
		echo "# $today"
		$0 -l $2 | awk '
			NR != 1 {
				if ($2!="*in*"&&$2!="*out*") {
					h[$3] += int(substr($2,2,2));
					m[$3] += int(substr($2,5,2));
				}
			} END {
				for (i in h) {
					h[i] += int(m[i] / 60);
					m[i] %= 60;
					printf("%02d:%02d\t%s\n",h[i],m[i],i);
				}
			}
		' | sort -k 1
		exit
		;;
	'in')
		if [ $create_today == '0' ]; then
			echo -e "\n\n# $today" >>$timesheet
		fi
		echo -e "$clock\t\t*in*" >>$timesheet
		;;
	'out')
		echo -e "$clock\t\t*out*" >>$timesheet
		;;
	*)
		time_diff=''
		last_clock=`tail -n 1 $timesheet`
			last_hour=${last_clock:0:2}
			last_min=${last_clock:3:2}
		adjustment="-v-${last_hour}H -v-${last_min}M -v-${seconds}S"
		time_diff=`date $adjustment +%H:%M`
		echo -e "$clock\t[$time_diff]\t$1" >>$timesheet
		;;
	esac
tail -n 1 $timesheet

