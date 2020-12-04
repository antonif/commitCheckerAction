import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    for (const i in args.lists.emailAddresses) {
        if (checkEmail(args.lists.emailAddresses[i]) != true) {
            core.info(`Your email address is: "${args.lists.emailAddresses[i]}"`)
            core.info('Incorrect email address!')
            throw new Error('Email is not supported!')
        }
        core.info(`Author email address is: "${args.lists.emailAddresses[i]}"`)
    }
}

function checkEmail(email: string): boolean{
  const regex = new RegExp('([a-z]+([.]|[0-9]+)?)+(\.p92)?@(sonymusic\.com|bct14\.de)')
  return regex.test(email)
}
