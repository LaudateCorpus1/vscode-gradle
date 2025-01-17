/*******************************************************************************
 * Copyright (c) 2021 Microsoft Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Microsoft Corporation - initial API and implementation
 *******************************************************************************/
package com.github.badsyntax.gradle;

import com.github.badsyntax.gradle.exceptions.GradleExecutionException;
import com.github.badsyntax.gradle.exceptions.ProcessException;
import com.github.badsyntax.gradle.process.Process;
import com.github.badsyntax.gradle.process.ProcessOutput;
import java.io.File;
import java.io.IOException;
import java.util.stream.Collectors;

public class GradleLocalInstallation implements GradleExecution {
  private File localInstallation;
  private static final String GRADLE_EXECUTION_UNIX = "gradle";
  private static final String GRADLE_EXECUTION_WINDOWS = "gradle.bat";

  public GradleLocalInstallation(File localInstallation) {
    this.localInstallation = localInstallation;
  }

  public synchronized String exec(String... args) throws GradleExecutionException {
    try {
      if (args.length == 0) {
        throw new GradleExecutionException("No gradle args supplied");
      }
      File binFolder = localInstallation.toPath().resolve("bin").toFile();
      Process process = new Process(binFolder);
      process.setUnixCommand(GRADLE_EXECUTION_UNIX);
      process.setWindowsCommand(GRADLE_EXECUTION_WINDOWS);
      process.exec(args);
      ProcessOutput processOutput = process.getProcessOutput();
      String stdErrString = processOutput.getStdErr().lines().collect(Collectors.joining("\n"));
      String stdOutString = processOutput.getStdOut().lines().collect(Collectors.joining("\n"));
      process.close();
      if (stdErrString.length() > 0) {
        throw new GradleExecutionException(String.format("Error running gradle: %s", stdErrString));
      }
      return stdOutString;
    } catch (IOException | ProcessException e) {
      throw new GradleExecutionException(String.format("Error running gradle: %s", e.getMessage()));
    }
  }
}
