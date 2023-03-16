
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../firebase/config';
import { ScrollView } from 'react-native';

export const HomeScreen = ({navigation}) => {

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idd, setIdd] = useState('');
  const [timer, setTimer] = useState('');
  const [users, setUsers] = useState('');
 


  useEffect(() => {
     console.log('Hoo you okay')
    // change();
    // readall();  
    // allUsers();
    getDocs(collection(db, "users")).then(docSnap =>{
      let users =[];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', users);
      setUsers(users);
      console.log(users)
  });

  },[])
  

  // componentWillMount(){
  //   change();
  // }
  
  
  console.log(timer)

  // function change() {
  //   setTimeout(() => {
  //     setTimer('Yes')
  //     console.log(timer)
  //   }, "1000");
  // }


  function create () {
    addDoc(collection(db, "users"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Added....");
alert("Added")
  }


  function update () {
    updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Updated....");
alert("Updated")
  }


  function Delete () {
    deleteDoc(doc(db, "users", idd)) 
    console.log("Deleted....", idd);
alert("Deleted", idd)
  }


  
  function read () {
    getDoc(doc(db, "users", idd), {

    }).then((docData) => {
      if (docData.exists()) {
        console.log(docData.data().Clocks);
        setName(docData.data().username)
        setEmail(docData.data().email)
      }else{
        console.log("No such data");
        alert("No such data")
      }
}).catch((error) => {
  console.log(error);
});
  }



  function readall () {
    getDocs(collection(db, "Clocks")).then(docSnap =>{
      let Clocks =[];
      docSnap.forEach((doc) => {
        Clocks.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', Clocks);
});
}

// function allUsers () {
//   getDocs(collection(db, "users")).then(docSnap =>{
//     let users =[];
//     docSnap.forEach((doc) => {
//       users.push({ ...doc.data(), id:doc.id})
//     });
//     console.log('Document data', users);
//     setUsers(users);
//     console.log(users)
// });
// }




function readByQuery () {
  getDocs(query(collection(db, "users"), where('email' , '==', 'solomon@gmail.com'))).then(docSnap =>{
    let users =[];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id})
    });
    console.log('Document data', users);
});
}




  




  function login () {
    console.log(users);
    
   const checkData = users.filter(d => d.email >= "atundepeter");
    console.log("email Output",checkData);
    
    const checkName = users.filter(d => d.username == "Solomon");
    console.log("Fetch by username",checkName);
    const email = (checkName[0])
    console.log("User Email",email.email);
    
  

    
  }

  function log_in() {
    if (!users) {
      alert('pls WAIT Loading')
    } else {
      console.log(users);

      const pass = users.filter(d => d.password == 1111 && d.username == "Solomon");
      console.log("Passed",pass);

      if(pass == ''){
          console.log('Access denied')
      }else {
          console.log('passed')
          const user = (pass[0])
          const username = (user.username)
          navigation.push("Details", {
            username: username,
            userdata:user
          });
          console.log('username', user.username )
      }

      

    //   const myJSON = JSON.stringify(checkName)
    //   console.log(myJSON)
    }
   
  }

function Proceed () {
  console.log('ok')
  setTimer("Okay")
}


  if (!timer) {
    return (
      <TailwindProvider>
     <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
      <View className='mt-10 flex space-y-4 mb-20'>
      <View>
        <Text> Hello </Text>
        </View>
        <View>
            <Button title="Proceed" onPress={Proceed}  />
            </View>
        </View>
        </View>
      </TailwindProvider>
)
  } else {
    return (
      <SafeAreaView>
          <TailwindProvider>
            <ScrollView>
         <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
          <View className='mt-10 flex space-y-4 mb-20'>
          <View>
            <Text className='font-bold'>HomePage -- Hurray</Text>
            </View>
      <View>
            <Button title="Create an Account" onPress={() => navigation.push('CreateAccount')} />
            </View>
            <View>
            <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('Details', {
            itemId: 6655,
            otherParam: 'anything you want here',
          });
        }}
      />
            </View>
            <View>
            <Button title="SigIn" onPress={() => navigation.push('SignIn')}  />
            </View>
            </View> 
      <View className=' flex-1 w-[90%] '>
        <Text>INSERT</Text>
            <View className='mb-10'>
            <TextInput value={username} onChangeText={(username) => {setName(username)}} placeholder='Username' className=' h-20 border'></TextInput>
           </View>
           <View className=''>
            <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' className=' h-20 border'></TextInput>
           </View>
           <View>
            <Button title="RealLogin" onPress={log_in}  />
            </View>
           <View>
            <Button title="JsonLogin" onPress={login}  />
            </View>
           <View>
            <Button title="Submit" onPress={create}  />
            </View>
            <View>
            <Button title="Update" onPress={update}  />
            </View>
            <View>
            <Button title="delete" onPress={Delete}  />
            </View>
            <View>
            <Button title="ReadById" onPress={read}  />
            </View>
            <View>
            <Button title="ReadAll" onPress={readall}  />
            </View>
            <View>
            <Button title="readByQuery" onPress={readByQuery}  />
            </View>
            <View className=''>
            <TextInput value={idd} onChangeText={(idd) => {setIdd(idd)}} placeholder='Id' className=' h-20 border'></TextInput>
           </View>
           
           </View>
           </View>
           </ScrollView>
          </TailwindProvider>
          </SafeAreaView>
        )
  }






}

export default HomeScreen