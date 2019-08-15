import {
    handleCors,
    handleBodyRequestParsing,
  } from './common';

import { handleAPIDocs } from './apiDocs';
export default [handleCors, handleBodyRequestParsing, handleAPIDocs];