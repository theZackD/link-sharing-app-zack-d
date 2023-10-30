import { ChangeEvent, useRef, useState } from "react";
import LogoLarge from "./assets/images/logo-devlinks-large.svg";
import PhoneImage from "./assets/images/illustration-phone-mockup.svg";
import Illustration from "./assets/images/illustration-empty.svg";
import { ref, uploadBytes } from "firebase/storage";
import { Storage } from "./firebase";
import { v4 } from "uuid";
// import Upload from "./assets/images/icon-upload-image.svg";
import "./Dashboard.css";

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

  // interface HTMLInputEvent extends Event {
  //   target: HTMLInputElement
  // }

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [firstError, setFirstError] = useState<string>("");
  const [lastError, setLastError] = useState<string>("");

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
    const imageRef = ref(
      Storage,
      `profile_pictures/${imageUpload.name + v4()}`,
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("image uploaded");
    });
  };

  const ChangeTab = (n: number) => {
    setTabSwitch(n);
  };

  return (
    <div className="dash-container">
      <div className="dash-head">
        <img src={LogoLarge} alt="" />
        <div className="tabs">
          <div
            onClick={() => ChangeTab(0)}
            className={tabSwitch === 0 ? "tab active" : "tab"}
          >
            <LinkIcon
              fill={tabSwitch === 0 ? "#633CFF" : ""}
              className="svg1 svg-active"
            />
            <p>Links</p>
          </div>
          <div
            onClick={() => ChangeTab(1)}
            className={tabSwitch === 1 ? "tab active" : "tab"}
          >
            <ProfileIcon
              fill={tabSwitch === 1 ? "#633CFF" : ""}
              className="svg2"
            />
            <p>Profile Details</p>
          </div>
        </div>
        <button className="btn-2" id="Prev">
          Preview
        </button>
      </div>
      <div className="dash-body">
        <div className="preview-side">
          <div className="preview-links">
            <img id="Phone" src={PhoneImage} alt="" />
            <div className="pp-container">
              {imageUpload ? (
                <img id="preview-propic" src={URL.createObjectURL(imageUpload)} />
              ) : (
                <img id="pp-preview" className="OFF" src="" alt="" />
              )}
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
            <button id="new-link-btn" className="btn-2">
              + Add new link
            </button>
            <div className="explanation">
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
                  {imageUpload ? (
                    <img
                      id="pp-preview"
                      src={URL.createObjectURL(imageUpload)}
                    />
                  ) : (
                    <img id="pp-preview" className="OFF" src="" alt="" />
                  )}
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
                  className="prof-input"
                  type="text"
                  placeholder="e.g. John"
                  ref={firstNameRef}
                />
                <p className="dash-error">{firstError}</p>
              </div>
              <div className="deet">
                <label className="prof-label" htmlFor="First name">
                  Last name*
                </label>
                <input
                  className="prof-input"
                  type="text"
                  placeholder="e.g. Appleseed"
                  ref={lastNameRef}
                />
                <p className="dash-error">{lastError}</p>
              </div>
              <div className="deet">
                <label className="prof-label" htmlFor="Email">
                  Email
                </label>
                <input
                  className="prof-input"
                  type="text"
                  placeholder="e.g email@example.com"
                  ref={emailRef}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="save-link">
            <button onClick={UploadImage} id="save-btn" className="btn-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
