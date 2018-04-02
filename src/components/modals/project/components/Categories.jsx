import React from 'react';

import Category from './category/Category';

const Categories = ({ models, openIndex, onOpen, onClose }) => {
  return (
    <div className="categories">
      {models.map((form, index) => (
        <Category
          open={openIndex.includes(index)}
          onOpen={() => onOpen(index)}
          onClose={() => onClose(index)}
          onSubmit={data => form.submit(data)}
          key={form.type}
          {...form}
        />
      ))}
    </div>
  );
};

export default Categories;
