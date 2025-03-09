import React, { ReactNode } from "react";
import { View } from "react-native";
import MapNavHeader from "./navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <View className="flex-1">
      <MapNavHeader />
      {children}
    </View>
  );
};

export default MainLayout;
