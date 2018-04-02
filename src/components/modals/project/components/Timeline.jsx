import React from 'react';
import classnames from 'classnames';

const Timeline = ({ models, openIndex, onOpen }) => {
  return (
    <div className="timeline">
      {models.map((form, index) => (
        <React.Fragment key={form.type}>
          <div
            className={classnames('timeline__bulb', {
              active: form.done(form.data || {}),
              open: openIndex.includes(index)
            })}
            onClick={() => onOpen(index, true)}
          >
            <span className="timeline__bulb-content">{index + 1}</span>
            <span className="timeline__bulb-type">{form.name}</span>
          </div>
          <span
            className={classnames('timeline__arrow', {
              active: form.done(form.data || {})
            })}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Timeline;
