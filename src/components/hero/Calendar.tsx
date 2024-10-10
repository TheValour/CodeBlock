import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../../context/api";
import ActivityCalendar from "react-activity-calendar";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function Calendar() {
    const  {uid, userCalendar} = useContext(APIContext);
    const [cal, setCal] = useState<any>('');
    let dateVals = [{
        "date": "2023-06-14",
        "count": 2,
        "level": 1
    }];

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const con = await userCalendar(uid?uid:'', "2024");
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
        // console.log(final)
        const objectArray = Object.entries(final).map(([timestamp, count]) => ({
            "date": convertToDate(timestamp),   
            count: Number(count),
            "level" : findLevel(count)
        }));
        dateVals = objectArray;
        // console.log(objectArray)
    }
    console.log(cal ? cal.userCalendar : "");

    if(!dateVals) return <span>Not Aval</span>
  return (
    <div className="bg-white flex justify-center items-start p-3">
        {cal && 
            <ActivityCalendar data={dateVals} maxLevel={3} 
                blockSize={13}
                renderBlock={(block, activity) =>
                React.cloneElement(block, {
                    'data-tooltip-id': 'react-tooltip',
                    'data-tooltip-html': `${activity.count} activities on ${activity.date}`
                })}
            />
        }
        <ReactTooltip id="react-tooltip" />
        <select className="m-2">
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
        </select>
    </div>
  )
}
