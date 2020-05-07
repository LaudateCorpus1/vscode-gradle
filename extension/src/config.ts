import * as vscode from 'vscode';
import { GradleConfig } from './proto/gradle_tasks_pb';

type AutoDetect = 'on' | 'off';

export function getConfigIsAutoDetectionEnabled(
  workspaceFolder: vscode.WorkspaceFolder
): boolean {
  return (
    vscode.workspace
      .getConfiguration('gradle', workspaceFolder.uri)
      .get<AutoDetect>('autoDetect', 'on') === 'on'
  );
}

export function getConfigIsTasksExplorerEnabled(): boolean {
  return vscode.workspace
    .getConfiguration('gradle')
    .get<boolean>('enableTasksExplorer', true);
}

export function getConfigJavaHome(): string | null {
  return vscode.workspace
    .getConfiguration('java')
    .get<string | null>('home', null);
}

export function getConfigJavaImportGradleUserHome(): string | null {
  return vscode.workspace
    .getConfiguration('java')
    .get<string | null>('import.gradle.user.home', null);
}

export function getConfigJavaImportGradleJvmArguments(): string | null {
  return vscode.workspace
    .getConfiguration('java')
    .get<string | null>('import.gradle.jvmArguments', null);
}

export function getConfigJavaImportGradleWrapperEnabled(): boolean {
  return vscode.workspace
    .getConfiguration('java')
    .get<boolean>('import.gradle.wrapper.enabled', true);
}

export function getConfigJavaImportGradleVersion(): string | null {
  return vscode.workspace
    .getConfiguration('java')
    .get<string | null>('import.gradle.version', null);
}

export function getConfigIsDebugEnabled(): boolean {
  return vscode.workspace
    .getConfiguration('gradle')
    .get<boolean>('debug', false);
}

export function getConfigFocusTaskInExplorer(): boolean {
  return vscode.workspace
    .getConfiguration('gradle')
    .get<boolean>('focusTaskInExplorer', true);
}

export type JavaDebug = {
  tasks: string[];
};

export function getConfigJavaDebug(
  workspaceFolder: vscode.WorkspaceFolder
): JavaDebug {
  return vscode.workspace
    .getConfiguration('gradle', workspaceFolder.uri)
    .get<JavaDebug>('javaDebug', {
      tasks: ['run', 'runBoot', 'test', 'intTest', 'integration'],
    });
}

export type ConfigTaskPresentationOptionsRevealKind =
  | 'always'
  | 'never'
  | 'silent';

export type ConfigTaskPresentationOptionsPanelKind =
  | 'shared'
  | 'dedicated'
  | 'new';

export interface ConfigTaskPresentationOptions
  extends Omit<vscode.TaskPresentationOptions, 'reveal' | 'panel'> {
  reveal: ConfigTaskPresentationOptionsRevealKind;
  panel: ConfigTaskPresentationOptionsPanelKind;
}

export function getConfigTaskPresentationOptions(): ConfigTaskPresentationOptions {
  return vscode.workspace
    .getConfiguration('gradle')
    .get<ConfigTaskPresentationOptions>('taskPresentationOptions', {
      reveal: 'always',
      focus: false,
      echo: true,
      showReuseMessage: false,
      panel: 'shared',
      clear: true,
    });
}

export function getGradleConfig(): GradleConfig {
  const gradleConfig = new GradleConfig();
  const gradleUserHome = getConfigJavaImportGradleUserHome();
  const gradleJvmArguments = getConfigJavaImportGradleJvmArguments();
  const gradleVersion = getConfigJavaImportGradleVersion();
  if (gradleUserHome !== null) {
    gradleConfig.setUserHome(gradleUserHome);
  }
  if (gradleJvmArguments !== null) {
    gradleConfig.setJvmArguments(gradleJvmArguments);
  }
  if (gradleVersion !== null) {
    gradleConfig.setVersion(gradleVersion);
  }
  gradleConfig.setWrapperEnabled(getConfigJavaImportGradleWrapperEnabled());
  return gradleConfig;
}