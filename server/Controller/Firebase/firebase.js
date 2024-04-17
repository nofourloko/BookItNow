const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./path/to/serviceAccountKey.json");


const app = initializeApp({
  credential: cert(serviceAccount),
});


const db = getFirestore()


const getNewestServices = async () => {
  try {
    const collectionRef =  await db.collection('services')
    const snapshot = await collectionRef.limit(5).get()
    let result = []
    snapshot.forEach(doc => {
      result.push(doc.data());
    });
    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }

}

const getSelectedService = async (id) => {
  try {
    const collectionRef = await db.collection('services').doc(id)
    const docData = await collectionRef.get()
    return docData.data()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
  
  
}

const checkEmail = async (userData) => {
  try{
    console.log(userData)
    const userRef = db.collection('users');
    const snapshot = await userRef.where("email", "==", userData.email).limit(1).get();

    if (snapshot._size === 0) {
      console.log('No matching documents.');
      return false;
    }

   let selectedUser = {
      userData: "",
      id : ""
   }

   snapshot.forEach(item => {
      selectedUser.id = item.id
      selectedUser.userData = item.data()
    })

    if(selectedUser.userData.password !== userData.password){
      return false
    }

    console.log(selectedUser)
    
    return selectedUser
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const addUser = async (newUser) => {
  try{
    const res = await db.collection('users').add({
      name : newUser.name,
      phone : newUser.phone,
      password : newUser.password,
      email :  newUser.email,
      appointments: []
    });
    return true
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const getData = async(id, collection) => {
  try{
    const usersCollection = await db.collection(collection).doc(id).get()
    return usersCollection.data() === undefined ? false : usersCollection.data()
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const changeUserData = async(data) => {
  try{
    const usersCollection = await db.collection('users').doc(data.id).update(data.userData)
    return true
  }catch(err){
    console.log(error)
    throw new Error(error)
  }
}

const calendar = async (doc, id, appointment) => {
  try{
    const res = await db.collection('calendars').doc(id).set({
      Days : doc,
      appointments : FieldValue.arrayUnion(appointment)
    });
    return true
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const saveUserAppointment = async (userObj, userId) => {
  try{
    const res = await db.collection('users').doc(userId).update({
      appointments : FieldValue.arrayUnion(userObj)
    })
    return true
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const getServiceByCategory = async (category) => {
  try{
    const servicesRef = db.collection('services')
    const serviceSnapshot = await servicesRef.where("category", "==", category).get()

    let result = []
    serviceSnapshot.forEach(doc => {
      result.push(doc.data());
    });

    return result
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const searchForServicesByPhrase = async (phrase) => {
  try {
    const collectionRef =  await db.collection('services')
    const snapshot = await collectionRef.get()
    let result = []
    snapshot.forEach(doc => {
     const {name, mainImage, addressString, id} = doc.data()

     if(name.includes(phrase) && result.length < 10){
      result.push({
        name : name,
        img : mainImage,
        address : addressString,
        id : id
      })
     }
    })

    console.log(result)

    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }


}

const addNewComment = async (commentObj) => {
  try{
    const collectionRef = await db.collection('services').doc(commentObj.place)
    const res = await collectionRef.update({
      reviews : FieldValue.arrayUnion(commentObj)
    })
    
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const addCommentUser = async (commentObj, userId) => {
  try{
    const collectionRef = await db.collection('users').doc(userId)
    const userData = await collectionRef.get()
    const selectedDate = commentObj.date.split(" ")

    if (!userData.exists) {
      console.log('No such document!');
      throw new Error('No such user')
    }
    
    const userAppointments = userData.data().appointments.map(item => {
      if(item.selectedDate.Day === parseInt(selectedDate[0])){
        if(item.selectedDate.Month === selectedDate[1]){
          item.commented = true

          return {
            ...item,
            commented: true 
          };
        }
      }
      return item
    })


    
    await collectionRef.update({
      comments : FieldValue.arrayUnion(commentObj),
      appointments : userAppointments
    })
    
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const changeCommentReaction = async (commentObj, char_action , service_id) => {
  try{
    const collectionRef = await db.collection('services').doc(service_id)
    const document_data = await collectionRef.get()

    if (!document_data.exists) {
      console.log('No such document!');
      throw new Error('No such document!')
    }

    const reviews = document_data.data().reviews.map(item => {
      if(JSON.stringify(item) === JSON.stringify(commentObj)){
        if(char_action === "+"){   
          return {
            ...item,
            likes : item.likes + 1
          }
        }else{
          return {
            ...item,
            dislikes : item.dislikes + 1
          }
        }
      }
      return item
    })

    await collectionRef.update({
      reviews : reviews
    })


  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const removeAppointment = async (appointmetObj, userId) => {
  try{
    const collectionRef = await db.collection('users').doc(userId)
    const document_data = await collectionRef.get()

    if (!document_data.exists) {
      console.log('No such document!');
      throw new Error('No such document!')
    }

    const appointments = document_data.data().appointments.filter(el => appointmetObj.AppointmentId !== el.AppointmentId)
    await collectionRef.update({
      appointments : appointments
    })
    return true
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}

const removeAppointmentService = async (place, appointment_id) => {
  try{
    const collectionRef = await db.collection('calendars').doc(place)
    const document_data = await collectionRef.get()

    if (!document_data.exists) {
      console.log('No such document!');
      throw new Error('No such document!')
    }

    const appointments = document_data.data().appointments.filter(el => appointment_id !== el.appointment_id)
    await collectionRef.update({
      appointments : appointments
    })

    return true
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
}


module.exports = {
  getNewestServices, 
  getSelectedService, 
  checkEmail, 
  addUser,
  getData,
  changeUserData,
  calendar,
  saveUserAppointment,
  getServiceByCategory,
  searchForServicesByPhrase,
  addNewComment,
  addCommentUser,
  changeCommentReaction,
  removeAppointment,
  removeAppointmentService
}

