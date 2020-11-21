import * as core from '@actions/core'
import * as github from '@actions/github'

export interface ICheckMailArgs {
  eventType : string
  allCommits : Array<typeof github.context.payload.commits.commit>
}

export async function checkCommitAuthorEmail(
  args: ICheckMailArgs
): Promise<void> {
   core.info(`Event type: "${args.eventType}"`)
   core.info(`Commits object: "${args.allCommits}"`)
   switch (args.eventType) {
       case 'pull_request': {
        for (const i in args.allCommits) {
            if (checkEmail(args.allCommits[i].author.email) != true) {
                core.info('Incorrect email address!')
                throw new Error('Email is not supported!')
            }
        }
       }
       case 'push': {
        for (const i in args.allCommits) {
            if (checkEmail(args.allCommits[i].author.email) != true) {
                core.info('Incorrect email address!')
                throw new Error('Email is not supported!')
            }
        }
       }
   }
}

function checkEmail(email: string): boolean{
  const regex = new RegExp('([a-z]+([.]|[0-9]+)?)+(\.p92)?@(sonymusic\.com|bct14\.de)')
  return regex.test(email)
}
