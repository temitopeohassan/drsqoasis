import { Fragment } from "react";
import { company } from "../data/site";

export default function Address(props) {
  return (
    <address {...props}>
      {company.address.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </address>
  );
}
