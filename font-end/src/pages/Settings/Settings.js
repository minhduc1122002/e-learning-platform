import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import { update, reset } from '../../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import "./Settings.css"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

function Settings() {
    const user = useSelector((state) => state.auth.user)
    const [newbio, setnewBio] = useState('')
    const [newName, setnewName] = useState('')
    const [newLocation, setnewLocation] = useState('')
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [profileImage, setprofileImage] = useState('')

    const dispatch = useDispatch()

    const { isSuccess, isLoading } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isSuccess) {
            toast.success("Your profile has been saved", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => dispatch(reset())
            });
            setoldPassword("")
            setnewPassword("")
            setConfirmNewPassword("")
            setprofileImage('')
        }
    }, [isSuccess, dispatch])

    const handleSubmitProfile = (e) => {
        e.preventDefault()
        let updatedUser = {
            bio: newbio,
            fullname: newName,
            location: newLocation,
            _id: user._id,
        }
        if (profileImage) {
            const storage = getStorage(app);
            const storageRef = ref(storage, `users/${profileImage.name}`)
            const uploadTask = uploadBytesResumable(storageRef, profileImage)

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updatedUser.profileImage = downloadURL
                    });
                }
            );
        }
        dispatch(update(updatedUser)) 
    }

    const handleChangePass = (e) => {
        e.preventDefault()
        if (!newPassword || !confirmNewPassword || !oldPassword) {
            return toast.error("Please Fill In The Form", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        if (newPassword !== confirmNewPassword) {
            return toast.error("Password confirmation doesn't match Password", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        const updatedUser = {
            _id: user._id,
            newPassword: newPassword,
            oldPassword: oldPassword,
        }
        dispatch(update(updatedUser))
    }
    
    return (
        <>
            <ToastContainer limit={1}/>
            <Navigation/>
            <div className='account-settings'>
                <article>
                    <h1>Accout Settings</h1>
                    <section>
                        <form className='profile-form'>
                            <h2>Avatar</h2>
                            <div class="c-avatar-selector">
                                <label htmlFor="avatar">
                                    <div class="setting-user-avatar" style={{backgroundImage: `url('${user.profileImage}')`}}></div>
                                </label>
                                <div class="--details">
                                    <div class="faux-button">
                                        <div class="btn-enhanced">Upload new image</div>
                                        <input type="file" id="avatar" onChange={(e) => setprofileImage(e.target.files[0])} />
                                        <div class="hover-bg"></div>
                                    </div>
                                    <div class="cropping">{profileImage ? "Your Image is here click save to update your profile" : "Show People Who You Are"}</div>
                                </div>
                            </div>
                            <h2>Profile</h2>
                            <div class="details">
                                <div class="name field">
                                    <label htmlFor="user_name" class="label">Name</label>
                                    <input id="user_name" type="text" defaultValue={user.fullname} onChange={(e) => setnewName(e.target.value)}/>
                                </div>
                                <div class="location field">
                                    <label htmlFor="user_location" class="label">Location</label>
                                    <label class="c-faux-input">
                                        <img src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/location-bd26e6dfc9d9d8b448b8e1f4637792133e507d2e.svg" alt="" role="presentation" class="c-icon"/>
                                        <input id="user_location" type="text" defaultValue={user.location} onChange={(e) => setnewLocation(e.target.value)}/>
                                    </label>
                                </div>
                            </div>
                            <div class="bio field">
                                <label htmlFor="user_bio" class="label">Bio</label>
                                <textarea id="user_bio" style={{height: "119px", width:"100%", resize: "vertical"}} onChange={(e) => setnewBio(e.target.value)} defaultValue={user.bio}/>
                                <div class="instructions">Tell the world about you 🌎. Emojis encouraged!</div>
                            </div>
                            <div class="form-footer">
                                <button class="save-profile-btn" onClick={handleSubmitProfile} disabled={isLoading}>Save profile data</button>
                            </div>
                        </form>
                    </section>
                    <section>
                        <form className='password-form'>
                            <h2>Change your password</h2>
                            <div class="field">
                                <label for="user_sudo_password" class="label">Current password</label>
                                <input type="password" id="user_sudo_password" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)}/>
                            </div>
                            <div class="field">
                                <label for="user_password" class="label">New password</label>
                                <input type="password" id="user_password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)}/>
                            </div>
                            <div class="field">
                                <label for="user_password_confirmation" class="label">Confirm new password</label>
                                <input type="password" id="user_password_confirmation" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            </div>
                            <div class="form-footer">
                                <button class="save-profile-btn" onClick={handleChangePass} disabled={isLoading}>Change password</button>
                            </div>
                        </form>
                    </section>
                </article>
            </div>
            <Footer/>
        </>
    )
}

export default Settings