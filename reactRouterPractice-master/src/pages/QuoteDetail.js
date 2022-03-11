import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centerd">{error}</p>;
  }

  if (!loadedQuote.text) {
    <p>NO quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact></Route>
      <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`}>
          Load Comments
        </Link>
      </div>
      <h1>Quote Detail page</h1>
      <p>{params.quoteId}</p>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
