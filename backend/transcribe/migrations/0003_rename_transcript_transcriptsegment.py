# Generated by Django 4.2 on 2024-02-02 12:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("transcribe", "0002_alter_transcript_starttimeinseconds"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Transcript",
            new_name="TranscriptSegment",
        ),
    ]