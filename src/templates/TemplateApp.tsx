import React, {FC, useState} from "react";
import { NavLink } from "react-router-dom";

const TemplateApp: FC = ({children}) => {
  const [showAside, setShowAside] = useState<boolean>(false)

  const handleToggleShowAside = () => setShowAside(prev => !prev)

  return (
    <>
      <header>
        <i onClick={handleToggleShowAside}>burger</i>
      </header>
      <main>
        {children}
      </main>
      {showAside ?
        <aside>
          <ul>
            <li><NavLink to="/applications">applications</NavLink></li>
            <li><NavLink to="/files">files</NavLink></li>
          </ul>
        </aside> : null}
    </>
  )
}

export default TemplateApp