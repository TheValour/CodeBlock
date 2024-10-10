import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../context/api";
import ActivityCalendar from "react-activity-calendar";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type HeroProps = {
    uid : string | undefined
}

export default function Calendar({uid} : HeroProps) {
    const  {userCalendar} = useContext(APIContext);
    const [cal, setCal] = useState<any>('');
    let dateVals = [{
        "date": "2023-06-14",
        "count": 2,
        "level": 1
    }];

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const con = await userCalendar(uid, "2024");
            setCal(con.data.data.matchedUser);
            
            console.log(cal.submissionCalendar); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    
    }, [uid, setCal]);
    function convertToDate(time: any) {
        const date = new Date(time*1000);
        const formattedDate = date.toISOString().split('T')[0]; 
        return formattedDate.toString();
    }
    function findLevel(count : any) {
        if(count > 10) return 0;
        else if(count > 6) return 1;
        else if(count > 3) return 2;
        return 3;
    }

    if(cal) {
        const final = JSON.parse(cal.userCalendar.submissionCalendar);

        console.log(final)
        const objectArray = Object.entries(final).map(([timestamp, count]) => ({
            "date": convertToDate(timestamp),   
            count: Number(count),
            "level" : findLevel(count)
        }));
        dateVals = objectArray;
        console.log(objectArray)
    }
    console.log(cal ? cal.userCalendar : "");
  return (
    <div className="bg-white">
        {cal && 
            <ActivityCalendar data={dateVals} maxLevel={3} 
            renderBlock={(block, activity) =>
            React.cloneElement(block, {
                'data-tooltip-id': 'react-tooltip',
                'data-tooltip-html': `${activity.count} activities on ${activity.date}`
            })}
            />
        }
        <ReactTooltip id="react-tooltip" />

    </div>
  )
}
