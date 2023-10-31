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
import { useState } from "react";

interface props {
  Rank: number;
}

const options = [
  { label: "Youtube", icon: YTicon, value: 1, 
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

export default function LinkEntry(props: props) {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[1]);

  return (
    <div className="link-comp-container">
      <div className="link-header">
        <div className="fulllinktitle">
          <img id="link-thingy" src={EqualSign} alt="" />
          <p className="link-title">Link #{props.Rank}</p>
        </div>
        <button className="btn-3">Remove</button>
      </div>
      <label className="plat">Platform</label>
      <SelectMenu
        options={options}
        value={value}
        onChange={(o) => {
            setValue(o)
        }}
      />
      <label className="plat">Link</label>
      <input id="Link-input" type="text" placeholder={value?.placeholder}/>
    </div>
  );
}
