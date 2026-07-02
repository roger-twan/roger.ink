import { NextRequest, NextResponse } from 'next/server';
import wechatSync from './wechat-sync';

const WEBSITE_BUILD_TRIGGER_PATHS = ['Technical/', 'Projects/', 'Skills'];
const WECHAT_TRIGGER_PATHS = ['General/', 'Living/', 'Reading/'];

export async function POST(request: NextRequest) {
  if (request.headers.get('Content-Type') === 'application/json') {
    const json = await request.json();
    const commit = json.head_commit;
    const addedFiles = commit.added;
    const removedFiles = commit.removed;
    const modifiedFiles = commit.modified;
    const websiteFiles = [...addedFiles, ...removedFiles, ...modifiedFiles];
    const wechatFiles = [...addedFiles, ...modifiedFiles];

    if (
      websiteFiles.some((file: string) =>
        WEBSITE_BUILD_TRIGGER_PATHS.some((path: string) => file.includes(path)),
      )
    ) {
      await fetch(
        `https://api.vercel.com/v1/integrations/deploy/${process.env.VERCEL_DEPLOY_IDENTITY}`,
      );
    }

    if (
      wechatFiles.some((file: string) =>
        WECHAT_TRIGGER_PATHS.some((path: string) => file.includes(path)),
      )
    ) {
      const files = wechatFiles.filter((file: string) =>
        WECHAT_TRIGGER_PATHS.some((path: string) => file.includes(path)),
      );

      await wechatSync(files);
    }
  }

  return NextResponse.json({ message: 'Accepted' }, { status: 200 });
}
