import React, { useEffect,useState } from 'react';
import { useLiff } from 'react-liff';

const App = () => {

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { error, isLoggedIn, isReady, liff } = useLiff();
  const pathVariable = decodeURIComponent(window.location.search)
  const params = new URLSearchParams(pathVariable)
  const psid = params.get("PSID") ? params.get("PSID"):"";
  const platform = params.get("platform") ? params.get("platform"):"Line";
  const psidDisplay = <p>PSID : {psid}</p>
  let fromStyle = {}
  if(platform==="Line"){
    fromStyle = {color:'#00B900'}
  }else{
    fromStyle = {color:'#1877f2'}
  }

  const onChangeEmail = event => {
    setEmail(event.target.value);
 };

 const onChangePhone = event => {
  setPhone(event.target.value);
};

const success =(event)=> {
  event.preventDefault();
  console.log(platform);
  console.log(userId);
  console.log(email);
  console.log(phone);
}

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
      setUserId(profile.userId);
      setEmail(liff.getDecodedIDToken().email);
    })();
  }, [liff, isLoggedIn]);

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!isReady) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return (
        liff.login()
      );
    }
    return (
      <>
        <div style={fromStyle}>
          <p>From : {platform}</p>
          {platform==='facebook' ? psidDisplay:""}
        </div>

        <p style={{color:'#A9A9A9'}}>user id : {userId}</p>
        
        <div>
          <p>username : {displayName}</p>
          <form onSubmit={success}>
            <p>
              <label>email : <input type="text" name="email" value={email} onChange={onChangeEmail}/></label>
            </p>
            <p>
              <label>Phone number : <input type="text" name="phone" value={phone} onChange={onChangePhone}/></label>
            </p>
            <p>
            <input style={{marginRight:"20px"}} type="submit" value="Submit" />

            <button className="App-button" onClick={liff.logout}>
              Log Out
            </button>
            </p>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">{showDisplayName()}</header>
    </div>
  );
};

export default App;