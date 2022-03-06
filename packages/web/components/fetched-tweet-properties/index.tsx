import React from 'react'

export interface FetchedTweetPropertiesLabelAttributes extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

function FetchedTweetPropertiesLabel({title, children}: FetchedTweetPropertiesLabelAttributes) {
  return (
    <div className="mb-3">
      <p className='mb-0 text-uppercase small fw-bold'>{title}</p>
      {children}
    </div>
  )
}

export default FetchedTweetPropertiesLabel
