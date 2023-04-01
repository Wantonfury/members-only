import { useState } from "react";
import "../styles/Loader.css";

const useLoader = () => {
  const [loading, setLoading] = useState(true);
  
  const getLoader = () => loading ? <div className="loader" ><div className="circle border"></div></div> : <></>;
  
  return [{ setLoading, getLoader }];
}

export default useLoader;