import * as fs from 'fs';
import * as gulp from 'gulp';
import {CHARSET} from './../../extensions/consts/files';

export default gulp.task('changelog-title', () => {
  fs.writeFileSync(
    './CHANGELOG.md',
    fs.readFileSync('CHANGELOG.md', CHARSET).replace('# Change Log', '# Material Theme Changelog'),
    {encoding: CHARSET});
});
