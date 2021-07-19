import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setshow] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          setshow(result);
          setisLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          seterror(err.message);
          setisLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data has been loaded</div>;
  }

  if (error) {
    return <div>Error occured{error}</div>;
  }

  console.log(show);

  return <div>this is show page</div>;
};

export default Show;
