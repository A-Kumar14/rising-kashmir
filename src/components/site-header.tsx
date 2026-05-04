import { Masthead } from "./masthead";
import { PrimaryNav } from "./primary-nav";
import { UtilityBar } from "./utility-bar";

export function SiteHeader() {
  return (
    <>
      <UtilityBar />
      <Masthead />
      <PrimaryNav />
    </>
  );
}
