/**
 * URLs base dos remotes por ambiente (sem /remoteEntry.js).
 * Staging e produção: substitua os placeholders ou use variáveis de ambiente no deploy.
 */
const REMOTE_BASE_URLS = {
  development: {
    header: 'http://localhost:3001',
    cards: 'http://localhost:3002',
    footer: 'http://localhost:3003',
  },
  staging: {
    header: 'https://REPLACE_ME-staging-header.example.com',
    cards: 'https://REPLACE_ME-staging-cards.example.com',
    footer: 'https://REPLACE_ME-staging-footer.example.com',
  },
  production: {
    header: 'https://REPLACE_ME-prod-header.example.com',
    cards: 'https://REPLACE_ME-prod-cards.example.com',
    footer: 'https://REPLACE_ME-prod-footer.example.com',
  },
};

/** Sobrescreve a URL base de um remote (ex.: MFE_REMOTE_HEADER_URL). */
const REMOTE_ENV_VARS = {
  header: 'MFE_REMOTE_HEADER_URL',
  cards: 'MFE_REMOTE_CARDS_URL',
  footer: 'MFE_REMOTE_FOOTER_URL',
};

const VALID_ENVS = ['development', 'staging', 'production'];

function resolveMfeEnv(webpackMode) {
  if (process.env.MFE_ENV) {
    if (!VALID_ENVS.includes(process.env.MFE_ENV)) {
      console.warn(
        `[mf-remotes] MFE_ENV="${process.env.MFE_ENV}" inválido; use: ${VALID_ENVS.join(', ')}`,
      );
      return 'development';
    }
    return process.env.MFE_ENV;
  }

  return webpackMode === 'development' ? 'development' : 'production';
}

function getRemoteBaseUrl(remoteName, mfeEnv) {
  const fromEnv = process.env[REMOTE_ENV_VARS[remoteName]];
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  return REMOTE_BASE_URLS[mfeEnv][remoteName];
}

/**
 * Retorna o objeto `remotes` do ModuleFederationPlugin.
 * @param {string} webpackMode - `development` | `production` (argv.mode do webpack)
 */
function getRemotes(webpackMode) {
  const mfeEnv = resolveMfeEnv(webpackMode);

  return {
    header: `header@${getRemoteBaseUrl('header', mfeEnv)}/remoteEntry.js`,
    cards: `cards@${getRemoteBaseUrl('cards', mfeEnv)}/remoteEntry.js`,
    footer: `footer@${getRemoteBaseUrl('footer', mfeEnv)}/remoteEntry.js`,
  };
}

module.exports = { getRemotes, resolveMfeEnv, REMOTE_BASE_URLS };
