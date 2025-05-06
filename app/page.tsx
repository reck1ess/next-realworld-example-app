import type { Metadata } from "next";

import Banner from "@/components/home/Banner";
import MainView from "@/components/home/MainView";
import Tags from "@/components/home/Tags";

export const metadata: Metadata = {
  title: "HOME | NEXT REALWORLD",
  description: "Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
}

export default function Page() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
