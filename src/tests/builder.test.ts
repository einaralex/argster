import { Builder, IBuilderOptions, ICommand } from '..';
import { IArgumentFilePatterns } from '../api';

const options: IBuilderOptions = {
  dynamicVariables: {
    BUILD_DATE: () => new Date().toISOString().slice(0, 10),
    DESCRIPTION: () => 'This is a description',
    NAME: () => 'TestName',
    SCHEMA_VERSION: () => '0.0.1',
    VCS_REF: () => 'Vcs ref',
    VENDOR: () => 'The vendor',
    VERSION: () => '1.1.1'
  }
};

const builder = new Builder(options);

const extensions: IArgumentFilePatterns[] = [
  {
    patterns: ['**/*test.lbl'],
    prefix: '--label'
  }
];

describe('Testing the methods in the command builder', () => {
  test('Create a command', () => {
    const cmd: ICommand = builder.createCommand('tester build ./myapp.ts');
    expect(cmd.toString())
      .toBe('tester build ./myapp.ts')
  });


  // test('Create a command and execute it', async () => {
  //   const cmd: ICommand = builder.createCommand('tester build .', [])
  //   expect(cmd.exec())
  //   .toEqual({
  //     "command": "tester build .",
  //     "promise": Promise.reject(new Error('test'))
  //   })
  // });

  test('Create a command and output arguments in an array', () => {
    const cmd: ICommand = builder.createCommand('tester build .');
    cmd.appendArgument('array');
    cmd.prependArgument({
      argument: 'argument',
      prefix: 'An'
    });
    expect(cmd.toArray()).toEqual(['An', 'argument', 'array']);
  });

  test('Create a command and prepend arguments', () => {
    const cmd: ICommand = builder.createCommand('tester build .');
    cmd.prependArgument('--arg1');
    cmd.prependArgument({
      argument: 'arg2',
      prefix: '-a'
    });
    expect(cmd.toString()).toBe('tester build . -a arg2 --arg1');
  });

  test('Create command and append arguments', () => {
    const cmd: ICommand = builder.createCommand('tester build .');
    cmd.appendArgument('--arg1');
    cmd.appendArgument({
      argument: 'arg2',
      prefix: '-a'
    });
    expect(cmd.toString()).toBe('tester build . --arg1 -a arg2');
  });


});
