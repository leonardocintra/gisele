"use client";

import { KindeOrganization } from "@kinde-oss/kinde-auth-nextjs/types";
import React, { createContext, useContext, useState } from "react";

const KindeRestauranteContext = createContext<KindeOrganization | undefined>(
  undefined
);

export const KindeRestauranteProvider = ({
  children,
  kindeOrganization,
}: {
  children: React.ReactNode;
  kindeOrganization: KindeOrganization;
}) => {
  const [currentOrganization] = useState<KindeOrganization>(kindeOrganization);

  return (
    <KindeRestauranteContext.Provider value={currentOrganization}>
      {children}
    </KindeRestauranteContext.Provider>
  );
};

export const useOrganizationKinde = () => useContext(KindeRestauranteContext);
