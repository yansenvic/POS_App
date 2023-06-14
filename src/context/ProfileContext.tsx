import { createContext, useContext, useState } from "react";

const ProfileContext = createContext({
  name: "",
  setName: (name: string) => {},
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("Yansen");
  return (
    <ProfileContext.Provider value={{ name, setName }}>
      {children}
    </ProfileContext.Provider>
  );
};
