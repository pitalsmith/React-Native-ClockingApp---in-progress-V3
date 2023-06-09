import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, Button } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const Details = ({ route, navigation }) => {
  const [users, setUsers] = useState("");
  const [userid, setUserId] = useState("");
  const { username, userdata } = route.params;
  const [allow, setAllow] = useState("");
  const [nextDayClockIn, setNextDayClockIn] = useState("");
  const [nextDayClockOut, setNextDayClockOut] = useState("");
  const [today, setToday] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [clockOutId, setClockOutId] = useState("");
  const [clockinTime, setClockInTime] = useState("");

  useEffect(() => {
    //**ALL USERS** */
    const usernameString = String(username);
    getDocs(collection(db, "users")).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data", users);
      setUsers(users);
      console.log("IUSERS DETAILS", users);
      const pass = users.filter((d) => d.username == usernameString);
      console.log(pass);
      const user = pass[0];
      const Id = user.id;
      const username = user.username;
      const clockTime = user.LatestClockIns;
      const nextDayClockIn = user.nextDayClockIn;
      const nextDayClockOut = user.nextDayClockOut;
      setClockInTime(user.LatestClockIns);
      console.log(clockTime);
      console.log("ClockTime", clockinTime, clockTime);
      setNextDayClockIn(nextDayClockIn);
      setNextDayClockOut(nextDayClockOut);
      console.log("Passed fetched", pass);
      console.log(Id);
      setUserId(Id);
      console.log(username);
      console.log(clockinTime);
      const c = clockTime;
      const stringclockInTime = String(c);
      const stringusername = String(username);

      getDocs(
        query(
          collection(db, "Clocks"),
          where("ClockIn", "==", stringclockInTime),
          where("username", "==", stringusername)
        )
      ).then((docSnap) => {
        let clocks = [];
        docSnap.forEach((doc) => {
          clocks.push({ ...doc.data(), id: doc.id });
        });
        let clock = clocks[0];
        let clockId = clock.id;
        console.log(
          "Clock Id && ClockInTime",
          clockId,
          stringclockInTime,
          stringusername
        );
        setClockOutId(clockId);
      });
    });
    CheckDate();
    CheckDate_Time();
    // dbclock();
  }, []);

  // function allUsers() {
  //   const usernameString = String(username);
  //   getDocs(collection(db, "users")).then((docSnap) => {
  //     let users = [];
  //     docSnap.forEach((doc) => {
  //       users.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log("Document data", users);
  //     setUsers(users);
  //     console.log("IUSERS DETAILS", users);
  //     const pass = users.filter((d) => d.username == usernameString);
  //     console.log(pass);
  //     const user = pass[0];
  //     const Id = user.id;
  //     const username = user.username;
  //     const clockTime = user.LatestClockIns;
  //     const nextDayClockIn = user.nextDayClockIn;
  //     const nextDayClockOut = user.nextDayClockOut;
  //     setClockInTime(user.LatestClockIns);
  //     console.log(clockTime);
  //     console.log("ClockTime", clockinTime, clockTime);
  //     setNextDayClockIn(nextDayClockIn);
  //     setNextDayClockOut(nextDayClockOut);
  //     console.log("Passed fetched", pass);
  //     console.log(Id);
  //     setUserId(Id);
  //     console.log(username);
  //     console.log(clockinTime);
  //     const c = clockTime;
  //     const stringclockInTime = String(c);
  //     const stringusername = String(username);

  //     getDocs(
  //       query(
  //         collection(db, "Clocks"),
  //         where("ClockIn", "==", stringclockInTime),
  //         where("username", "==", stringusername)
  //       )
  //     ).then((docSnap) => {
  //       let clocks = [];
  //       docSnap.forEach((doc) => {
  //         clocks.push({ ...doc.data(), id: doc.id });
  //       });
  //       let clock = clocks[0];
  //       let clockId = clock.id;
  //       console.log(
  //         "Clock Id && ClockInTime",
  //         clockId,
  //         stringclockInTime,
  //         stringusername
  //       );
  //       setClockOutId(clockId);
  //     });
  //   });
  // }

  function Clock_in() {
    const wDate = "Monday";
    console.log("Javascript Generated Day Today", wDate);
    // *********************
    if (wDate == nextDayClockIn && wDate == "Monday") {
      const nextDayClockIn = "Tuesday";
      setNextDayClockIn("Tuesday");
      CheckDate_Time();
      CheckDate();
      SetClock();

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockIn: nextDayClockIn,
        LatestClockIns: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }
    console.log("nextDayClockIn", nextDayClockIn);

    // *********************
    if (wDate == nextDayClockIn && wDate == "Tuesday") {
      const nextDayClockIn = "Wednesday";
      setNextDayClockIn("Wednesday");
      CheckDate_Time();
      CheckDate();
      SetClock();

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockIn: nextDayClockIn,
        LatestClockIns: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }
    console.log("nextDayClockIn", nextDayClockIn);

    // *********************

    if (wDate == nextDayClockIn && wDate == "Wednesday") {
      const nextDayClockIn = "Thursday";
      setNextDayClockIn("Thursday");
      CheckDate_Time();
      CheckDate();
      SetClock();

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockIn: nextDayClockIn,
        LatestClockIns: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }
    console.log("nextDayClockIn", nextDayClockIn);

    // *********************
    // *********************

    if (wDate == nextDayClockIn && wDate == "Thursday") {
      const nextDayClockIn = "Friday";
      setNextDayClockIn("Friday");
      CheckDate_Time();
      CheckDate();
      SetClock();

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockIn: nextDayClockIn,
        LatestClockIns: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");

      console.log("nextDayClockIn", nextDayClockIn);
    }
    // *********************
    // *********************

    if (wDate == nextDayClockIn && wDate == "Friday") {
      const nextDayClockIn = "Monday";
      setNextDayClockIn("Monday");
      CheckDate_Time();
      CheckDate();
      SetClock();

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockIn: nextDayClockIn,
        LatestClockIns: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");

      console.log("nextDayClockIn", nextDayClockIn);
    }
    if (wDate != nextDayClockIn) {
      alert("Pls Wait For Your Next Clock Day");
    }
  }

  function CheckDate_Time() {
    // Original WEEK DAYS
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dd = new Date();
    let today = weekday[dd.getUTCDay()];
    setToday(today);
    console.log("Day of the Week", today);

    //Original Hour, Time and Minutes
    const dddd = new Date();
    let hh = dddd.getHours();
    let mm = dddd.getMinutes();
    let ss = dddd.getSeconds();
    let Time = hh + ":" + mm + ":" + ss;
    setCurrentTime(Time);
    console.log("Time", currentTime);
  }

  function CheckDate() {
    //Original
    let iDate = new Date();
    let cDay = iDate.getDate();
    let cMonth = iDate.getMonth() + 1;
    let cYear = iDate.getFullYear();
    let AllDate = cDay + ":" + cMonth + ":" + cYear
    setCurrentDate(AllDate)
    console.log('All Date', AllDate)

    setCurrentDay(cDay);
    setCurrentMonth(cMonth);
    setCurrentYear(cYear);
    console.log("Date", cDay, cMonth, cYear);
  }

  function SetClock() {
    addDoc(collection(db, "Clocks"), {
      username: username,
      ClockIn: currentTime,
      ClockOut: '',
      Date: currentDate,
      Day_Of_Week: today,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Added....");
    alert("Added");
  }

  function updateDay() {
    const useridString = String(userid);
    updateDoc(doc(db, "users", useridString), {
      nextDayClockIn: "nextDayClockIn",
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Updated....");
    alert("Updated");
  }

  // function dbclock() {
  //   const c = "14:16:6";
  //   const stringclockInTime = String(c);
  //   const stringusername = String(username);

  //   getDocs(
  //     query(
  //       collection(db, "Clocks"),
  //       where("ClockIn", "==", stringclockInTime),
  //       where("username", "==", "Atunde")
  //     )
  //   ).then((docSnap) => {
  //     let clocks = [];
  //     docSnap.forEach((doc) => {
  //       clocks.push({ ...doc.data(), id: doc.id });
  //     });
  //     let clock = clocks[0];
  //     let clockId = clock.id;
  //     console.log(
  //       "Clock Id && ClockInTime",
  //       clockId,
  //       stringclockInTime,
  //       stringusername
  //     );
  //     setClockOutId(clockId);
  //   });
  // }

  function Clock_Out() {
    console.log(clockinTime, clockOutId);
    const LocalnextDayClockIn = "Friday";
    if (LocalnextDayClockIn == nextDayClockOut) {
      alert("Wait for next Clock Out");
    }
    //  **Monday***
    if (LocalnextDayClockIn == "Monday" && nextDayClockOut == "Friday") {
      console.log(clockOutId, nextDayClockIn, nextDayClockOut);
      CheckDate_Time();
      CheckDate();
      const stringclockOutId = String(clockOutId);
      // *** Update Clock Time***
      updateDoc(doc(db, "Clocks", stringclockOutId), {
        ClockOut: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
      // *** Update ClockOutDay***
      const nextDayClockOut = "Monday";
      setNextDayClockOut("Monday");

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockOut: nextDayClockOut,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }

    if (LocalnextDayClockIn == "Tuesday" && nextDayClockOut == "Monday") {
      console.log(clockOutId, nextDayClockIn, nextDayClockOut);
      CheckDate_Time();
      CheckDate();
      console.log(currentTime);
      const stringclockOutId = String(clockOutId);
      // *** Update Clock Time***
      updateDoc(doc(db, "Clocks", stringclockOutId), {
        ClockOut: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
      // *** Update ClockOutDay***
      const nextDayClockOut = "Tuesday";
      setNextDayClockOut("Tuesday");

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockOut: nextDayClockOut,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }

    if (LocalnextDayClockIn == "Wednesday" && nextDayClockOut == "Tuesday") {
      console.log(clockOutId, nextDayClockIn, nextDayClockOut);
      CheckDate_Time();
      CheckDate();
      console.log(currentTime);
      const stringclockOutId = String(clockOutId);
      // *** Update Clock Time***
      updateDoc(doc(db, "Clocks", stringclockOutId), {
        ClockOut: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
      // *** Update ClockOutDay***
      const nextDayClockOut = "Wednesday";
      setNextDayClockOut("Wednesday");

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockOut: nextDayClockOut,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }
  

    if (LocalnextDayClockIn == "Thursday" && nextDayClockOut == "Wednesday") {
      console.log(clockOutId, nextDayClockIn, nextDayClockOut);
      CheckDate_Time();
      CheckDate();
      const stringclockOutId = String(clockOutId);
      // *** Update Clock Time***
      updateDoc(doc(db, "Clocks", stringclockOutId), {
        ClockOut: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
      // *** Update ClockOutDay***
      const nextDayClockOut = "Thursday";
      setNextDayClockOut("Thursday");

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockOut: nextDayClockOut,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }

    if (LocalnextDayClockIn == "Friday" && nextDayClockOut == "Thursday") {
      console.log(clockOutId, nextDayClockIn, nextDayClockOut);
      CheckDate_Time();
      CheckDate();
      const stringclockOutId = String(clockOutId);
      // *** Update Clock Time***
      updateDoc(doc(db, "Clocks", stringclockOutId), {
        ClockOut: currentTime,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
      // *** Update ClockOutDay***
      const nextDayClockOut = "Friday";
      setNextDayClockOut("Friday");

      const useridString = String(userid);
      updateDoc(doc(db, "users", useridString), {
        nextDayClockOut: nextDayClockOut,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Updated....");
      alert("Updated");
    }
  }

  return (
    <TailwindProvider>
      <View className="flex-1 justify-center items-center bg-red-500 font-bold">
        <View className="mt-10 mx-auto flex flex-col space-y-4">
          <View>
            <Text className="font-bold">Details</Text>
            <Text>Username: {username}</Text>
          </View>
          <View>
            <Button title="Clock_In" onPress={Clock_in} />
          </View>
          <View>
            <Button title="Clock_Out" onPress={Clock_Out} />
          </View>
          <View>
          
             <Button
        title="My Clock History"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('ClockHistory', {
            username: username,
            otherParam: 'anything you want here',
          });
        }}
      />
          </View>
          
          <View>
          <Button
              title="AllStaff"
              onPress={() => navigation.push("AllStaff")}
            />
          </View>
          <View>
          <Button
              title="ResetClock"
              onPress={() => navigation.push("ResetClock")}
            />
          </View>
          <View>
            <Button
              title="Home"
              onPress={() => navigation.push("HomeScreen")}
            />
          </View>
          <View>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
          </View>

          <StatusBar style="auto" />
        </View>
      </View>
    </TailwindProvider>
  );
};

export default Details;
