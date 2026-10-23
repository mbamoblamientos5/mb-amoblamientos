import { Fragment } from 'react'

/** Renderiza un título partido en renglones, como los `<br>` del diseño original. */
export function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ))
}
