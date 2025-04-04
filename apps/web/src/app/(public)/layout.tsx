import React from "react";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main>{children}</main>;
};

export default PublicLayout;
