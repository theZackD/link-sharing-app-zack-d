import { ChangeEvent, useRef, useState } from "react";
import LogoLarge from "./assets/images/logo-devlinks-large.svg";
// import LinkEntry from "./LinkEntry";
import PhoneImage from "./assets/images/illustration-phone-mockup.svg";
import Illustration from "./assets/images/illustration-empty.svg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "./AuthContext";
import { Storage } from "./firebase";

import "./LinkEntry.css";
import EqualSign from "./assets/images/icon-drag-and-drop.svg";
import YTicon from "./assets/images/icon-youtube.svg";
import FBicon from "./assets/images/icon-facebook.svg";
import FCCicon from "./assets/images/icon-freecodecamp.svg";
import FMicon from "./assets/images/icon-frontend-mentor.svg";
import GHicon from "./assets/images/icon-github.svg";
import GLicon from "./assets/images/icon-gitlab.svg";
import CWicon from "./assets/images/icon-codewars.svg";
import CPicon from "./assets/images/icon-codepen.svg";
import TWicon from "./assets/images/icon-twitter.svg";
import TWTCHicon from "./assets/images/icon-twitch.svg";
import SOicon from "./assets/images/icon-stack-overflow.svg";
import SelectMenu from "./SelectMenu";
import Arrow from './assets/images/icon-arrow-right.svg'


// import Upload from "./assets/images/icon-upload-image.svg";
import "./Dashboard.css";
import { useNavigate } from "react-router";

interface props {
  Rank: number;
  id : string;
  handlePrev : (e : React.KeyboardEvent<HTMLInputElement>) => void
}

function LinkIcon(props: { fill?: string; className: string }) {
  return (
    <svg
      fill="none"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        fill={props.fill || "#737373"}
        d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z"
      />
    </svg>
  );
}

function Upload(props: { fill?: string; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      className={props.className || ""}
      viewBox="0 0 40 40"
    >
      <path
        fill={props.fill || "#633CFF"}
        d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
      />
    </svg>
  );
}

function ProfileIcon(props: { fill?: string; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill={props.fill || "none"}
      className={props.className}
      viewBox="0 0 21 20"
    >
      <path
        fill={props.fill || "#737373"}
        d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
      />
    </svg>
  );
}

export default function Dashboard() {
  const [tabSwitch, setTabSwitch] = useState<number>(0);
  
  const options = [
    { label: "YouTube", icon: YTicon, value: 1, 
    placeholder : "e.g. https://www.youtube.com/zackd" },
    { label: "Facebook", icon: FBicon, value: 2, 
    placeholder : "e.g. https://www.facebook.com/zackd" },
    { label: "FreeCodeCamp", icon: FCCicon, value: 3, 
    placeholder : "e.g. https://www.freecodecamp.com/zackd"  },
    { label: "Frontend Mentor", icon: FMicon, value: 4, 
    placeholder : "e.g. https://www.frontendmentor.io/zackd"  },
    { label: "Stack Overflow", icon: SOicon, value: 5, 
    placeholder : "e.g. https://www.stackoverflow.com/zackd"  },
    { label: "GitHub", icon: GHicon, value: 6,
    placeholder : "e.g. https://www.github.com/zackd"  },
    { label: "GitLab", icon: GLicon, value: 7, 
    placeholder : "e.g. https://www.gitlab.com/zackd"  },
    { label: "CodeWars", icon: CWicon, value: 8, 
    placeholder : "e.g. https://www.codewars.com/zackd"  },
    { label: "Twitter", icon: TWicon, value: 9, 
    placeholder : "e.g. https://www.twitter.com/zackd"  },
    { label: "Twitch", icon: TWTCHicon, value: 10, 
    placeholder : "e.g. https://www.twitch.com/zackd"  },
    { label: "CodePen", icon: CPicon, value: 11, 
    placeholder : "e.g. https://www.codepen.com/zackd"  },
  ];
  // interface HTMLInputEvent extends Event {
  //   target: HTMLInputElement
  // }

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [ProfileImage, setProfileImage] = useState('')


  getDownloadURL(ref(Storage,`profile_picture`))
    .then(response => {
      setProfileImage(response)
    })

  

  

  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);

  const [firstError, setFirstError] = useState<string>("");
  const [lastError, setLastError] = useState<string>("");

  const [isShownExp, setIsShownExp] = useState<Boolean>(true);

  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAdress] = useState<string>("");

  const [linkPreview1, setLinkPreviews1] = useState<string>('');
  const [linkPreview2, setLinkPreviews2] = useState<string>('');
  const [linkPreview3, setLinkPreviews3] = useState<string>('');
  const [linkPreview4, setLinkPreviews4] = useState<string>('');
  const [linkPreview5, setLinkPreviews5] = useState<string>('');
  
  // const setGroup = [setLinkPreviews1,setLinkPreviews2,setLinkPreviews3,setLinkPreviews4,setLinkPreviews5]
  
  const prevRef1 = useRef<HTMLInputElement>(null)
  const prevRef2 = useRef<HTMLInputElement>(null)
  const prevRef3 = useRef<HTMLInputElement>(null)
  const prevRef4 = useRef<HTMLInputElement>(null)
  const prevRef5 = useRef<HTMLInputElement>(null)

  const prevRefs = [prevRef1,prevRef2,prevRef3,prevRef4,prevRef5]
  
  const handleNamePreview = () => {
    return setFullName(
      `${firstNameRef.current?.value} ${lastNameRef.current?.value}`,
      );
    };
    
    const handleEmailPreview = () => {
      console.log(emailRef)
      return setEmailAdress(`${emailRef.current?.value}`);
    };

  const handleLinkPreview1 = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter'){
      var prevy = prevRef1.current?.value
      setLinkPreviews1(prevRef1.current?.value!)
      setIsActiveBtn(true)
      setTimeout(() => {
        prevRef1!.current!.value = prevy!
        prevRef2.current && (prevRef2.current.value = linkPreview2);
        prevRef3.current && (prevRef3.current.value = linkPreview3);
        prevRef4.current && (prevRef4.current.value = linkPreview4);
        prevRef5.current && (prevRef5.current.value = linkPreview5);
        console.log(linkPreview1)
        setIsActiveBtn(true)
      }, 10);
      setTimeout(() => {
        var LA : HTMLInputElement | null = document.querySelector('#l1');
        LA!.focus()
      }, 20);
    }
  }
  
  const handleLinkPreview2 = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter'){
      console.log(prevRef2.current?.value)
      var prevy = prevRef2.current?.value
      setIsActiveBtn(true)
      setLinkPreviews2(prevRef2.current?.value!)
      setTimeout(() => {
        prevRef2!.current!.value = prevy!
        prevRef1.current && (prevRef1.current.value = linkPreview1);
        prevRef3.current && (prevRef3.current.value = linkPreview3);
        prevRef4.current && (prevRef4.current.value = linkPreview4);
        prevRef5.current && (prevRef5.current.value = linkPreview5);
        setIsActiveBtn(true)
        console.log(linkPreview2)
      }, 10);
      setTimeout(() => {
        var LA : HTMLInputElement | null = document.querySelector('#l2');
        LA!.focus()
      }, 20);
    }
  }
  
  const handleLinkPreview3 = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter'){
      console.log(prevRef3.current?.value)
      var prevy = prevRef3.current?.value
      setIsActiveBtn(true)
      setLinkPreviews3(prevRef3.current?.value!)
      setTimeout(() => {
        prevRef3!.current!.value = prevy!
        prevRef2.current && (prevRef2.current.value = linkPreview2);
        prevRef1.current && (prevRef1.current.value = linkPreview1);
        prevRef4.current && (prevRef4.current.value = linkPreview4);
        prevRef5.current && (prevRef5.current.value = linkPreview5);
        setIsActiveBtn(true)
        console.log(linkPreview3)
      }, 10);
      setTimeout(() => {
        var LA : HTMLInputElement | null = document.querySelector('#l3');
        LA!.focus()
      }, 20);
    }
  }
  
  const handleLinkPreview4 = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter'){
      console.log(prevRef4.current?.value)
      var prevy = prevRef4.current?.value
      setIsActiveBtn(true)
      setLinkPreviews4(prevRef4.current?.value!)
      setTimeout(() => {
        prevRef4!.current!.value = prevy!
        prevRef2.current && (prevRef2.current.value = linkPreview2);
        prevRef3.current && (prevRef3.current.value = linkPreview3);
        prevRef1.current && (prevRef1.current.value = linkPreview1);
        prevRef5.current && (prevRef5.current.value = linkPreview5);
        setIsActiveBtn(true)
        console.log(linkPreview4)
      }, 10);
      setTimeout(() => {
        var LA : HTMLInputElement | null = document.querySelector('#l4');
        LA!.focus()
      }, 20);
    }
  }
  
  const handleLinkPreview5 = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter'){
      console.log(prevRef5.current?.value)
      var prevy = prevRef5.current?.value
      setIsActiveBtn(true)
      setLinkPreviews5(prevRef5.current?.value!)
      setTimeout(() => {
        prevRef5!.current!.value = prevy!
        prevRef2.current && (prevRef2.current.value = linkPreview2);
        prevRef3.current && (prevRef3.current.value = linkPreview3);
        prevRef4.current && (prevRef4.current.value = linkPreview4);
        prevRef1.current && (prevRef1.current.value = linkPreview1);
        setIsActiveBtn(true)
        console.log(linkPreview5)
      }, 10);
      setTimeout(() => {
        var LA : HTMLInputElement | null = document.querySelector('#l5');
        LA!.focus()
      }, 20);
    }
  }


  const [isSharePg, setIsSharePg] = useState<Boolean>(false)

  const backToEditor = () => {
    return setIsSharePg(false)
  }

  const PreviewBTN = () => {
    return setIsSharePg(true)
  }

  const handleSavelinks = () => {
    setIsActiveBtn(false)
    prevRef1.current && setLinkPreviews1(prevRef1.current.value)
    prevRef2.current && setLinkPreviews2(prevRef2.current.value)
    prevRef3.current && setLinkPreviews3(prevRef3.current.value)
    prevRef4.current && setLinkPreviews4(prevRef4.current.value)
    prevRef5.current && setLinkPreviews5(prevRef5.current.value)
  }
    

    const UploadImage = () => {
      if (firstNameRef.current?.value == "") {
        return setFirstError(`Can't be empty`);
      }
      if (lastNameRef.current?.value == "") {
        return setFirstError(""), setLastError(`Can't be empty`);
      }
      console.log(imageUpload);
      if (imageUpload == null) {
        return;
      }
      setFirstError("");
      setLastError("");
      const imageRef = ref(
        Storage,
        `profile_picture`,
        );
        uploadBytes(imageRef, imageUpload).then(() => {
          console.log("image uploaded");
        });
        getDownloadURL(imageRef).then(response => {setProfileImage(response)})
      };
      
      const ChangeTab = (n: number) => {
    setTabSwitch(n);
  };
  
  const [linkNumber, setLinkNumber] = useState<number>(1);

  const [LinkRank, setLinkRank] = useState<number[]>([])

  const [value, setValue] = useState<number[]>([]);
  const [PH, setPH] = useState<string | undefined>(options[0].placeholder)

  function changem(arr : number[],i : number,v : number){
    let array2 = arr;
    array2[i] = v-1
    return array2
}

  const { logout } = useAuth()
  const navigate = useNavigate()

  const [LogError, setLogError] = useState('')

  function LinkEntry(props: props) {
  
    return (
      <div className="link-comp-container">
        <div className="link-header">
          <div className="fulllinktitle">
            <img id="link-thingy" src={EqualSign} alt="" />
            <p className="link-title">Link #{props.Rank}</p>
          </div>
          <button onClick={() => {
                if(props.Rank == 1){
                  let v2 = value
                  v2.shift()
                  setValue([...v2])
                } else {
                  let v2 = value.slice(props.Rank)
                  v2.shift()
                  setValue([...value.slice(0,props.Rank),...v2])
                  console.log(value)
                }
                // console.log(options[value[]].label)

                setLinkRank(Array.from({length: linkNumber-2}, (_, i) => i + 1))
                setLinkNumber(linkNumber - 1)
              }} className="btn-3">Remove</button>
        </div>
        <label className="plat">Platform</label>
        <SelectMenu
          options={options}
          value={options[value[props.Rank]] ? options[value[props.Rank]] : options[0]}
          onChange={(o) => {
              setValue(changem(value, props.Rank, o?.value))
              setPH(o?.placeholder)
              console.log(PH)
          }}
        />
        <label className="plat">Link</label>
        <input onKeyUp={(e) => props.handlePrev(e)} id={props.id} type="text" placeholder={
          options[value[props.Rank]] ? options[value[props.Rank]].placeholder : options[0].placeholder
          }
          ref={prevRefs[props.Rank-1]
          }
          />
      </div>
    );
  }
  

  return (
    <>
    <div className={isSharePg ? "OFF" : "dash-container"}>
      <div className="Logout">
        <button className="btn-1" style={{'width' : '16ch'}} onClick={async () => {
          try {
            await logout()
            navigate('./../login')
          } catch {
            console.log('Failed to logout')
            setLogError('Oops ! Failed to logout ! Please try again.')
          }
        }}>Logout</button>
        <p style={{'color' : 'red'}}>{LogError}</p>
      </div>
      <div className="dash-head">
        <img src={LogoLarge} alt="" />
        <div className="tabs">
          <div
            onClick={() => (ChangeTab(0), console.log(value), console.log(LinkRank))}
            className={tabSwitch === 0 ? "tab active" : "tab"}
          >
            <LinkIcon
              fill={tabSwitch === 0 ? "#633CFF" : ""}
              className="svg1 svg-active"
              />
            <p>Links</p>
          </div>
          <div
            onClick={() => (ChangeTab(1))}
            className={tabSwitch === 1 ? "tab active" : "tab"}
          >
            <ProfileIcon
              fill={tabSwitch === 1 ? "#633CFF" : ""}
              className="svg2"
            />
            <p>Profile Details</p>
          </div>
        </div>
        <button onClick={PreviewBTN} className="btn-2" id="Prev">
          Preview
        </button>
      </div>
      <div className="dash-body">
        <div className="preview-side">
          <div className="preview-links">
            <img id="Phone" src={PhoneImage} alt="" />
            <div className="pp-container">
              <img id="preview-propic" src={ProfileImage} />
            </div>
            <p id="fl-name"> {fullName} </p>
            <p id="emailaddress"> {emailAddress} </p>
            <div className="colored-prevs">
              <div className={`linkpreviewsquare ${options[value[1]] && options[value[1]].label}`}>
                <div className="logoandname">
                  {value[1]+1 ? <img className="previcon" src={options[value[1]].icon} alt="" /> : <></>}
                  <p>{options[value[1]] && options[value[1]].label}</p>
                </div>
                <img className="arrow" src={Arrow} alt="" />
              </div>
              <div className={`linkpreviewsquare ${options[value[2]] && options[value[2]].label}`}>
                <div className="logoandname">
                  {value[2]+1 ? <img className="previcon" src={options[value[2]].icon} alt="" /> : <></>}
                  <p>{options[value[2]] && options[value[2]].label}</p>
                </div>
                <img className="arrow" src={Arrow} alt="" />
              </div>
              <div className={`linkpreviewsquare ${options[value[3]] && options[value[3]].label}`}>
                <div className="logoandname">
                  {value[3]+1 ? <img className="previcon" src={options[value[3]].icon} alt="" /> : <></>}
                  <p>{options[value[3]] && options[value[3]].label}</p>
                </div>
                <img className="arrow" src={Arrow} alt="" />
              </div>
              <div className={`linkpreviewsquare ${options[value[4]] && options[value[4]].label}`}>
                <div className="logoandname">
                  {value[4]+1 ? <img className="previcon" src={options[value[4]].icon} alt="" /> : <></>}
                  <p>{options[value[4]] && options[value[4]].label}</p>
                </div>
                <img className="arrow" src={Arrow} alt="" />
              </div>
              <div className={`linkpreviewsquare ${options[value[5]] && options[value[5]].label}`}>
                <div className="logoandname">
                  {value[5]+1 ? <img className="previcon" src={options[value[5]].icon} alt="" /> : <></>}
                  <p>{options[value[5]] && options[value[5]].label}</p>
                </div>
                <img className="arrow" src={Arrow} alt="" />
              </div>
            </div>

            
          </div>
        </div>
        <div className="full-op">
          <div className={tabSwitch === 0 ? "op-side" : "op-side OFF"}>
            <div className="customize">
              <h1 className="cus-title">Customize your links</h1>
              <p>
                Add/edit/remove links below and then share all your profiles
                with the world
              </p>
            </div>
            <button onClick={() => {
              if (linkNumber == 6){
                return
              }
              setIsShownExp(false)
              setValue([...value,0])
              setTimeout(() => {
                
                setLinkRank([...LinkRank,linkNumber]);
                setLinkNumber(linkNumber + 1)
              }, 100);
            }
            } 
            id="new-link-btn" 
            className="btn-2">
              + Add new link
            </button>

            <div className={isShownExp ? "explanation" : "OFF"}>
              <div className="">
                <img src={Illustration} alt="" />
              </div>
              <h1 className="cus_title">Let's get you started</h1>
              <p id="link-exp-text">
                Use the "Add new link" button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </p>
              </div>

{/* Entry ---------------------------------------------------------------------------------------- */}

            <div className="links-container">
              {(LinkRank[0]+1) && 
              <div className='linky'>
                <LinkEntry handlePrev={handleLinkPreview1} id="l1"
                Rank={LinkRank[0]} />
              </div>}
              {LinkRank[1] && 
              <div className='linky'>
                <LinkEntry handlePrev={handleLinkPreview2} id="l2"
                Rank={LinkRank[1]} />
              </div>}
              {LinkRank[2] && 
              <div className='linky'>
                <LinkEntry handlePrev={handleLinkPreview3} id="l3"
                Rank={LinkRank[2]} />
              </div>}
              {LinkRank[3] && 
              <div className='linky'>
                <LinkEntry handlePrev={handleLinkPreview4} id="l4"
                Rank={LinkRank[3]} />
              </div>}
              {LinkRank[4] && 
              <div className='linky'>
                <LinkEntry handlePrev={handleLinkPreview5} id="l5"
                Rank={LinkRank[4]} />
              </div>}

            </div>
          </div>
          <div className={tabSwitch === 1 ? "full-pro" : "full-pro OFF"}>
            <div>
              <h1 className="cus-title">Profile Details</h1>
              <p>Add your details to create a personal touch to your profile</p>
            </div>
            <div className="upload-space">
              <p>Profile picure</p>
              <label htmlFor="image-upload">
                <div className={imageUpload ? "overlay" : "OFF"}></div>
                <div className="upload-image">
                  <input
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setImageUpload(event.target.files![0]);
                      setIsActiveBtn(true);
                    }}
                    type="file"
                    name="image-upload"
                    id="file-input"
                    accept=".jpg,.png"
                  />
                  <Upload
                    className="svg-up"
                    fill={imageUpload ? "white" : ""}
                  />
                  <p
                    className="upload-text"
                    style={imageUpload ? { color: "white" } : {}}
                  >
                    + Upload Image
                  </p>
                  {imageUpload && <img id="pp-preview" src={URL.createObjectURL(imageUpload)}/>}
                </div>
              </label>

              <p id="img-format">
                Image must be below 1024x1024px. <br />
                Use PNG or JPG format
              </p>
            </div>
            <div className="details">
              <div className="deet">
                <label className="prof-label" htmlFor="First name">
                  First name*
                </label>
                <input
                  onKeyUp={handleNamePreview}
                  className="prof-input"
                  type="text"
                  placeholder="e.g. Zakaria "
                  ref={firstNameRef}
                />
                <p className="dash-error">{firstError}</p>
              </div>
              <div className="deet">
                <label className="prof-label" htmlFor="First name">
                  Last name*
                </label>
                <input
                  onKeyUp={handleNamePreview}
                  className="prof-input"
                  type="text"
                  placeholder="e.g. Daoudi"
                  ref={lastNameRef}
                />
                <p className="dash-error">{lastError}</p>
              </div>
              <div className="deet">
                <label className="prof-label" htmlFor="Email">
                  Email
                </label>
                <input
                  onKeyUp={handleEmailPreview}
                  className="prof-input"
                  type="text"
                  placeholder="e.g dr.zakaria95@gmail.com"
                  ref={emailRef}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="save-link">
            <button
              disabled={!isActiveBtn}
              onClick={tabSwitch == 1 ? UploadImage : handleSavelinks}
              id="save-btn"
              className="btn-1"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={isSharePg ? "share-page" : "OFF"}>
      <div className="purple-part">
        <div className="navbar">
          <button id="back-edit" onClick={backToEditor} className="btn-2">Back to Editor</button>
          <button id="share" className="btn-1">Share Link</button>
        </div>
      </div>
      <div className="card">
      <div className="colored-prevs2">
             {options[value[1]] && ( <div className={`linkpreviewsquare ${options[value[1]] && options[value[1]].label}`}>
                <div className="logoandname">
                  {value[1]+1 ? <img className="previcon" src={options[value[1]].icon} alt="" /> : <></>}
                  <p>{options[value[1]] && options[value[1]].label}</p>
                </div>
                <a href={linkPreview1}><img className="arrow" src={Arrow} alt="" /></a>
              </div>)}
              {options[value[2]] && (<div className={`linkpreviewsquare ${options[value[2]] && options[value[2]].label}`}>
                <div className="logoandname">
                  {value[2]+1 ? <img className="previcon" src={options[value[2]].icon} alt="" /> : <></>}
                  <p>{options[value[2]] && options[value[2]].label}</p>
                </div>
                <a href={linkPreview2}><img className="arrow" src={Arrow} alt="" /></a>
              </div>)}
              {options[value[3]] && (<div className={`linkpreviewsquare ${options[value[3]] && options[value[3]].label}`}>
                <div className="logoandname">
                  {value[3]+1 ? <img className="previcon" src={options[value[3]].icon} alt="" /> : <></>}
                  <p>{options[value[3]] && options[value[3]].label}</p>
                </div>
                <a href={linkPreview3}><img className="arrow" src={Arrow} alt="" /></a>
              </div>)}
              {options[value[4]] && (<div className={`linkpreviewsquare ${options[value[4]] && options[value[4]].label}`}>
                <div className="logoandname">
                  {value[4]+1 ? <img className="previcon" src={options[value[4]].icon} alt="" /> : <></>}
                  <p>{options[value[4]] && options[value[4]].label}</p>
                </div>
                <a href={linkPreview4}><img className="arrow" src={Arrow} alt="" /></a>
              </div>)}
              {options[value[5]] && (<div className={`linkpreviewsquare ${options[value[5]] && options[value[5]].label}`}>
                <div className="logoandname">
                  {value[5]+1 ? <img className="previcon" src={options[value[5]].icon} alt="" /> : <></>}
                  <p>{options[value[5]] && options[value[5]].label}</p>
                </div>
                <a href={linkPreview5}><img className="arrow" src={Arrow} alt="" /></a>
              </div>)}
            </div>
            <div className="card-cont">
              <div className="pp-container2">
                <img
                  id="preview-propic"
                  src={ProfileImage}
                />
          
              </div>
              <p id="fl-name2"> {fullName} </p>
              <p id="emailaddress2"> {emailAddress} </p>
            </div>
      </div>
    </div>
    </>
  );
}
