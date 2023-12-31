import React from "react";

interface IconProps {
  title: string;
  icon: React.JSX.Element;
  count: number;
  subtitle: string;
}

const Icon: React.FC<IconProps> = ({ title, icon, count, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-2 border-2">
      <div className="flex items-center">
        <icon.type className="w-8 h-8 mr-2" />
        <h2 className="ml-2 text-xl">{title}</h2>
      </div>
      <div className="text-xl ml-2">
        <p>{count}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Icon;
