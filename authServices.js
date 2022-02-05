import { configureTnsOAuth, TnsOAuthClient } from 'nativescript-oauth2'
import { TnsOaProviderGoogle } from 'nativescript-oauth2/providers'
import * as ApplicationSettings from 'application-settings'
import Vue from 'nativescript-vue'
import store from './app/store'
import axios from 'axios/dist/axios'

let client = null

export function configureOAuthProviders() {
  const googleProvider = configureOAuthProviderGoogle()
  configureTnsOAuth([googleProvider])
}

function configureOAuthProviderGoogle() {
  const googleProviderOptions = {
    openIdSupport: 'oid-full',
    clientId:
      '937461151809-f5j725a8v9surgormte6kqt3qlf5f46g.apps.googleusercontent.com',
    redirectUri:
      'com.googleusercontent.apps.937461151809-f5j725a8v9surgormte6kqt3qlf5f46g:home',
    urlScheme:
      'com.googleusercontent.apps.937461151809-f5j725a8v9surgormte6kqt3qlf5f46g',
    scopes: ['email'],
  }

  return new TnsOaProviderGoogle(googleProviderOptions)
}

export function tnsOauthLogin(providerType) {
  client = new TnsOAuthClient(providerType)

  client.loginWithCompletion((tokenResult, err) => {
    if (err) {
      console.log(err)
      return err
    } else {
      store.dispatch('isLogged/setIdToken', tokenResult.idToken)
      console.log('Token: ' + tokenResult.idToken)
    }
  })
}

export function tnsOauthLogout() {
  if (client) {
    client.logout()
    store.dispatch('isLogged/setIdToken', '')
    console.log('Logout successfully !')
  }
}
