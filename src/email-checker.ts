import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    for (const i in args.emailAddresses) {
        if (checkEmail(args.emailAddresses[i]) != true) {
            core.info('Incorrect email address!')
            throw new Error('Email is not supported!')
        }
    }
}

function checkEmail(email: string): boolean{
  const regex = new RegExp('([a-z]+([.]|[0-9]+)?)+(\.p92)?@(sonymusic\.com|bct14\.de)')
  return regex.test(email)
}
