// package com.github.badsyntax.vscodegradleplugin;

// import static org.junit.Assert.*;

// import java.io.File;
// import java.io.FileWriter;
// import java.io.IOException;
// import java.io.Writer;
// import java.nio.file.Files;
// import org.gradle.testkit.runner.BuildResult;
// import org.gradle.testkit.runner.GradleRunner;
// import org.junit.Test;

// public class VsCodeGradlePluginFunctionalTest {
//   @Test
//   public void canRunTask() throws IOException {
//     // Setup the test build
//     File projectDir = new File("build/functionalTest");
//     Files.createDirectories(projectDir.toPath());
//     writeString(new File(projectDir, "settings.gradle"), "");
//     writeString(
//         new File(projectDir, "build.gradle"),
//         "plugins {" + "  id('com.github.badsyntax.vscodegradleplugin.VsCodeProjectPlugin')" +
// "}");

//     // Run the build
//     GradleRunner runner = GradleRunner.create();
//     // runner.forwardOutput();
//     // runner.withPluginClasspath();
//     // runner.withArguments("greeting");
//     runner.withProjectDir(projectDir);
//     BuildResult result = runner.build();

//     // Verify the result
//     assertTrue(
//         result
//             .getOutput()
//             .contains("Hello from plugin 'com.github.badsyntax.vscodegradleplugin.greeting'"));
//   }

//   private void writeString(File file, String string) throws IOException {
//     try (Writer writer = new FileWriter(file)) {
//       writer.write(string);
//     }
//   }
// }
