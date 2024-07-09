import React from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";

const EcommerceLayout = async ({ children }) => {
  try {
    const categories = await prisma.category.findMany();
    const session = await getSession();

    // Ensure that categories and session are plain objects
    const plainCategories = categories.map((category) => ({ ...category }));
    const plainSession = session
      ? { ...session, isLoggedIn: session.isLoggedIn }
      : { isLoggedIn: false };

    return (
      <div>
        <Toaster />
        <Header categories={plainCategories} session={plainSession} />
        {children}
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div>
        <Toaster />
        <Header categories={[]} session={{ isLoggedIn: false }} />
        {children}
      </div>
    );
  }
};

export default EcommerceLayout;
