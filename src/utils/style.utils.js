import { css } from 'styled-components'

const sizes = {
  mobile: 575,
  small: 760,
  medium: 960,
  large: 1180,
  xlarge: 1460,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export function maxWidth(width) {
  return `
    max-width: ${width};
    margin-left: auto;
    margin-right: auto;
  `
}
