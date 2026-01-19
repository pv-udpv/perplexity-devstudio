import { format } from 'prettier/standalone';
import * as babel from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';

export const beautifyCode = async (code: string) => {
  try {
    return await format(code, {
      parser: 'babel',
      plugins: [babel, estree],
      semi: true,
      singleQuote: true
    });
  } catch (e) {
    console.error('Beautify failed', e);
    return code;
  }
};
