import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<boolean> {
    const regex = new RegExp(args.emailPattern, args.flags)
    for (let email of args.lists.emailAddresses) {
        if (regex.test(email) != true) {
            core.info(`Your email address is: "${email}"`)
            core.info('Incorrect email address!')
            core.info('Email is not supported!')
            return false
        }
        core.info(`Author email address is: "${email}"`)
    }
    return true
}