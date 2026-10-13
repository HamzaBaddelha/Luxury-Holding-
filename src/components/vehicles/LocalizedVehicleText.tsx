import { Fragment } from "react";

// Isolate Latin names/codes inside Arabic sentences without changing the approved copy.
export const LocalizedVehicleText = ({ children }: { children: string }) => (
  <>{children.split(/([A-Za-z0-9]+(?:[ ’'-][A-Za-z0-9]+)*)/g).map((part, index) =>
    index % 2 ? <bdi dir="ltr" key={index}>{part}</bdi> : <Fragment key={index}>{part}</Fragment>
  )}</>
);
