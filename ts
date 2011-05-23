#!/bin/bash
# ts - for timeslips/timesheet
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

