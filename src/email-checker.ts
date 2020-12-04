import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    for (let email of args.lists.emailAddresses) {
        if (checkEmail(email, args.emailPattern, args.flags) != true) {
            core.info(`Your email address is: "${email}"`)
            core.info('Incorrect email address!')
            throw new Error('Email is not supported!')
        }
        core.info(`Author email address is: "${email}"`)
    }
}

function checkEmail(
  email: string,
  emailPattern: string,
  flags: string
): boolean {
  const regex = new RegExp(emailPattern, flags)
  return regex.test(email)
}
